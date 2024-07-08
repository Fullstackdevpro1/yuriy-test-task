const express = require("express");
const { Configuration, OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = 5001;

// const newConfig = new Configuration({
//   apiKey: process.env.OPENAI_SECRET_KEY,
// });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY, // This is the default and can be omitted
});

// const openai = new OpenAIApi(newConfig);

const chatHistory = [];

const generateMessage = async (userInput) => {
  const messageList = chatHistory.map(([input_text, completion_text]) => ({
    role: input_text === "ChatGPT" ? "assistant" : "user",
    content: input_text,
  }));
  messageList.push({ role: "user", content: userInput });

  try {
    const GPTOutput = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageList,
    });

    console.log(GPTOutput, "GPTOutput");

    const output_text = GPTOutput.choices[0].message.content;
    chatHistory.push([userInput, output_text]);
    return output_text;
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
    return "Error generating message";
  }
};

app.get("/generate-message", async (req, res) => {
  const userInput = "Generate greeting for new user";
  const message = await generateMessage(userInput);
  res.send({ message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
