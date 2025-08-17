import { callOpenAI } from "./providers/openai.js";
import { callClaude } from "./providers/claude.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { provider, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  try {
    let reply = "";

    switch (provider) {
      case "openai":
        reply = await callOpenAI(message);
        break;
      case "claude":
        reply = await callClaude(message);
        break;
      default:
        reply = "Provedor não suportado.";
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro no backend:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
