import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
    });
  }
  return aiClient;
}

// Fallback prototype analysis heuristic when API key is unavailable or upon error
function generatePrototypeFallback(imageHint?: string) {
  const isCrack = imageHint?.toLowerCase().includes("crack");
  const isUneven = imageHint?.toLowerCase().includes("uneven");
  const isEdge = imageHint?.toLowerCase().includes("edge");
  const isClean = imageHint?.toLowerCase().includes("clean") || imageHint?.toLowerCase().includes("good");

  if (isClean) {
    return {
      damageType: "No Obvious Damage",
      severity: "Low",
      confidencePercent: 88,
      priorityScore: 18,
      potentialSafetyImpact: "Minimal immediate hazard detected. Standard routine monitoring recommended.",
      roadConditionRating: "Good",
      identifiedIssues: [
        {
          name: "Intact Asphalt Wearing Course",
          description: "Surface appears relatively continuous with minor normal oxidation.",
          approximateLocation: "Full road width",
          box2d: [100, 100, 900, 900],
        },
      ],
      decisionFactors: {
        damageSeverityWeight: 15,
        roadConditionWeight: 20,
        trafficSafetyImpactWeight: 18,
      },
      aiAssessmentSummary: "Surface exhibits no deep structural cavities or hazardous fissures. Routine periodic observation advised.",
      recommendedAction: "Log for scheduled quarterly pavement survey.",
      isSimulated: true,
    };
  }

  if (isCrack) {
    return {
      damageType: "Crack",
      severity: "Medium",
      confidencePercent: 81,
      priorityScore: 56,
      potentialSafetyImpact: "Moisture ingress risk during rains which may accelerate base-layer degradation.",
      roadConditionRating: "Fair",
      identifiedIssues: [
        {
          name: "Longitudinal & Alligator Micro-cracks",
          description: "Interconnected surface fractures indicating early fatigue of the upper asphalt layer.",
          approximateLocation: "Wheel path zone",
          box2d: [260, 220, 710, 780],
        },
      ],
      decisionFactors: {
        damageSeverityWeight: 55,
        roadConditionWeight: 50,
        trafficSafetyImpactWeight: 58,
      },
      aiAssessmentSummary: "Crack network detected along high-load contact zones. Crack sealing recommended before wet season.",
      recommendedAction: "Schedule bituminous crack sealing and seal-coat application.",
      isSimulated: true,
    };
  }

  if (isUneven || isEdge) {
    return {
      damageType: isEdge ? "Edge Damage" : "Uneven Surface",
      severity: "Medium",
      confidencePercent: 79,
      priorityScore: 62,
      potentialSafetyImpact: "Shoulder drop-off and minor vehicle trajectory instability for light vehicles.",
      roadConditionRating: "Fair",
      identifiedIssues: [
        {
          name: isEdge ? "Pavement Edge Depletion" : "Surface Depression / Rutting",
          description: "Localized settlement and irregular cross-slope deviation.",
          approximateLocation: isEdge ? "Outer road shoulder" : "Mid-span driving lane",
          box2d: [310, 180, 750, 840],
        },
      ],
      decisionFactors: {
        damageSeverityWeight: 60,
        roadConditionWeight: 62,
        trafficSafetyImpactWeight: 64,
      },
      aiAssessmentSummary: "Depression and edge raveling observed. May trap surface water and cause hydroplaning.",
      recommendedAction: "Leveling course overlay and edge stabilization.",
      isSimulated: true,
    };
  }

  // Default: Pothole demo
  return {
    damageType: "Pothole",
    severity: "High",
    confidencePercent: 86,
    priorityScore: 82,
    potentialSafetyImpact: "Direct tire impact, rim damage, and high sudden swerving hazard for two-wheelers and passenger vehicles.",
    roadConditionRating: "Poor",
    identifiedIssues: [
      {
        name: "Deep Bowl-Shaped Cavity",
        description: "Localized loss of asphalt binder and aggregate exposing sub-base material.",
        approximateLocation: "Right wheel path / travel lane",
        box2d: [340, 280, 720, 720],
      },
    ],
    decisionFactors: {
      damageSeverityWeight: 85,
      roadConditionWeight: 80,
      trafficSafetyImpactWeight: 88,
    },
    aiAssessmentSummary: "Significant surface rupture with structural cavity characteristics. Meets immediate patching threshold.",
    recommendedAction: "Dispatch cold-mix or hot-mix asphalt patching crew within 48 hours pending human verification.",
    isSimulated: true,
  };
}

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

// API: Analyze damage from image
app.post("/api/analyze-damage", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", hint } = req.body;

    // Handle missing image, SVG data URIs, or non-string input immediately with prototype fallback
    if (
      !imageBase64 ||
      typeof imageBase64 !== "string" ||
      imageBase64.includes("image/svg+xml")
    ) {
      const fallback = generatePrototypeFallback(hint);
      return res.json({
        ...fallback,
        note: "Prototype Demo Result • Prototype AI Assessment",
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback prototype response when API key is not configured
      const fallback = generatePrototypeFallback(hint);
      return res.json({
        ...fallback,
        note: "Prototype Demo Result • Prototype AI Assessment",
      });
    }

    // Extract base64 and ensure supported mimeType
    let effectiveMimeType = mimeType;
    let cleanedBase64 = imageBase64;
    const match = imageBase64.match(/^data:(image\/[a-zA-Z0-9.+_-]+);base64,(.+)$/);
    if (match) {
      effectiveMimeType = match[1];
      cleanedBase64 = match[2];
    } else if (imageBase64.startsWith("data:")) {
      // Non-base64 data URI format
      const fallback = generatePrototypeFallback(hint);
      return res.json({
        ...fallback,
        note: "Prototype Demo Result • Prototype AI Assessment",
      });
    }

    if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(effectiveMimeType)) {
      effectiveMimeType = "image/jpeg";
    }

    const prompt = `You are an AI computer vision assistant for an academic Design Thinking prototype on "AI-Based Road Surface Damage Detection and Repair Priority System".
Analyze this road photograph and detect road surface damage.
Categorize the primary damage strictly into one of: "Pothole", "Crack", "Uneven Surface", "Edge Damage", "No Obvious Damage".
Classify severity into: "Low", "Medium", "High", "Critical".
Calculate a prototype priority score from 0 to 100 based on severity, road safety hazard, and road condition.
Identify any distinct damage regions with approximate bounding boxes (box2d as [ymin, xmin, ymax, xmax] normalized between 0 and 1000).
Clearly emphasize that this is a "Prototype AI Analysis" assisting human road maintenance engineers.`;

    const contents = [
      {
        parts: [
          {
            inlineData: {
              data: cleanedBase64,
              mimeType: effectiveMimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ];

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        damageType: {
          type: Type.STRING,
          description: "Must be one of: Pothole, Crack, Uneven Surface, Edge Damage, No Obvious Damage",
        },
        severity: {
          type: Type.STRING,
          description: "Must be one of: Low, Medium, High, Critical",
        },
        confidencePercent: {
          type: Type.INTEGER,
          description: "Prototype AI confidence score between 50 and 99",
        },
        priorityScore: {
          type: Type.INTEGER,
          description: "Decision support priority score between 0 and 100",
        },
        potentialSafetyImpact: {
          type: Type.STRING,
          description: "Concise description of potential safety hazard to vehicles and commuters",
        },
        roadConditionRating: {
          type: Type.STRING,
          description: "Overall road segment condition: Good, Fair, Poor, Severe",
        },
        identifiedIssues: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              approximateLocation: { type: Type.STRING },
              box2d: {
                type: Type.ARRAY,
                items: { type: Type.INTEGER },
                description: "[ymin, xmin, ymax, xmax] coordinates from 0 to 1000",
              },
            },
            required: ["name", "description", "approximateLocation"],
          },
        },
        decisionFactors: {
          type: Type.OBJECT,
          properties: {
            damageSeverityWeight: { type: Type.INTEGER },
            roadConditionWeight: { type: Type.INTEGER },
            trafficSafetyImpactWeight: { type: Type.INTEGER },
          },
          required: ["damageSeverityWeight", "roadConditionWeight", "trafficSafetyImpactWeight"],
        },
        aiAssessmentSummary: {
          type: Type.STRING,
          description: "Clear technical summary of the observed road surface damage",
        },
        recommendedAction: {
          type: Type.STRING,
          description: "Recommended maintenance action for municipal verification",
        },
      },
      required: [
        "damageType",
        "severity",
        "confidencePercent",
        "priorityScore",
        "potentialSafetyImpact",
        "roadConditionRating",
        "identifiedIssues",
        "decisionFactors",
        "aiAssessmentSummary",
        "recommendedAction",
      ],
    };

    // Primary model is gemini-3.8-flash; if experiencing temporary high demand (503), try gemini-3.1-flash-lite
    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
    let textResult: string | null = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            responseMimeType: "application/json",
            responseSchema,
          },
        });
        if (response?.text) {
          textResult = response.text;
          break;
        }
      } catch (callErr: any) {
        console.warn(
          `AI vision model ${modelName} temporary demand/status: ${callErr?.status || callErr?.message || "unavailable"}. Evaluating alternatives...`
        );
      }
    }

    if (!textResult) {
      // Gracefully switch to prototype fallback when upstream model is temporarily unavailable
      console.warn("Vision model service temporarily experiencing high demand; serving high-fidelity prototype simulation.");
      const fallback = generatePrototypeFallback(hint);
      return res.json({
        ...fallback,
        isSimulated: true,
        note: "Prototype Demo Result • Prototype AI Assessment",
      });
    }

    const parsed = JSON.parse(textResult);
    return res.json({
      ...parsed,
      isSimulated: false,
      note: "Prototype AI Analysis via Vision Engine",
    });
  } catch (err: any) {
    console.warn("Notice in /api/analyze-damage, serving prototype analysis fallback:", err?.message || err);
    const fallback = generatePrototypeFallback(req.body?.hint);
    return res.json({
      ...fallback,
      isSimulated: true,
      note: "Prototype Demo Result • Prototype AI Assessment",
    });
  }
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
