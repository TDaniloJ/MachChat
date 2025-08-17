export async function callOpenAI(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // ou outro modelo que você preferir
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Erro ao obter resposta do OpenAI.";
}
