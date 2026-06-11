import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client (will lazy load or validate the key in endpoints)
let ai: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables. Please configure this key in settings.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array of conversation turns" });
    }

    const client = getGeminiClient();

    // Map client messages to Gemini's expected Content format
    const gContents = messages.map((m: any) => {
      const role = m.role === "assistant" ? "model" : "user";
      return {
        role,
        parts: [{ text: m.content || "" }]
      };
    });

    const promptText = "Eres STEALER (anteriormente PandaFin), un gatito negro extremadamente inteligente, adorable y travieso, con ojos amarillos brillantes y una pequeña moneda de oro brillante. Actúas como el coach financiero personal y mentor del usuario. Te dejas llevar por impulsos divertidos y graciosos maullidos (miau, gatu-fantástico, zarpazo de ahorro, ronroneo, gatico-consejo, etc.). Tu propósito es dar consejos financieros sabios, prácticos y motivadores en español colombiano, usando siempre Pesos Colombianos (COP - $) como la moneda estándar, y asumiendo rangos de costo de vida y precios reales de Colombia (por ejemplo, pasajes de autobús de $3.000 COP, almuerzos de $15.000 COP, arriendos o consolas en millones, etc.) para ayudar a ahorrar, evitar gastos hormiga, crear presupuestos y progresar en las finanzas de forma ludificada. El estilo de interacción debe ser similar a Duolingo (amigable, alentador, un poco dramático o exageradamente tierno cuando cometen errores de gasto). Utiliza emojis de patitas 🐾, estrellas ✨ y gatitos 🐈‍⬛. Sé amigable, directo, divertido e interactivo.";

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: gContents,
      config: {
        systemInstruction: promptText,
        temperature: 1.0,
      }
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("Error calling Gemini API:", err);
    res.status(500).json({ error: err.message || "Failed to communicate with AI Coach" });
  }
});

// Vite middleware for development or serving SPA in production
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Vite setup error:", err);
});
