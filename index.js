import { config } from 'dotenv';
config();

import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async(req, res) => {

  const {message} = req.body;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "Vygeneruj titulek článku na základě klíčových slov zadaných uživatelem. Piš bez uvozovek a pouze jeden titulek."},
      {"role": "user", "content": `${message}`}
    ]
  })

  const imageGeneration = await openai.images.generate({
    model: "dall-e-2",
    prompt: chatCompletion.choices[0].message.content,
    n: 1,
    size: "512x512",
  });

  res.json({
    completion: chatCompletion.choices[0], image: imageGeneration.data[0]
  })

});

app.listen(PORT, (error) => {

  if (error) console.log("Error in server setup");
  
  console.log(`Server listening on PORT: ${PORT}`);
  
});
