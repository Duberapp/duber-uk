const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  let prompt = `Generate a building inspection report start with a Summary and includes Recommendations with a numbered list and a Conclusion about ${req.body.name}\n\nReport Details:\n\n`;
  const gptResponse = await openai.complete({
    engine: "text-davinci-003",
    prompt: prompt,
    maxTokens: 800,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};
