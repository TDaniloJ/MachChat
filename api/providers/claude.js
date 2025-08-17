export async function callClaude(message) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 512,
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  return data.content?.[0]?.text || "Erro ao obter resposta do Claude.";
}
