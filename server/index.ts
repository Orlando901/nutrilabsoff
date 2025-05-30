import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Nouvelle syntaxe pour openai
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  const complementsPath = path.join(__dirname, '../complements.json');
  const complements = JSON.parse(fs.readFileSync(complementsPath, 'utf-8'));

  const base = complements
    .map((c: any) => `- ${c.nom} : ${c.description}`)
    .join('\n');

  const prompt = `
Voici les compléments actuellement disponibles sur le site NutriLabs :

${base}

Tu es un assistant spécialisé, et tu dois répondre uniquement à partir de ces compléments.
Si la question porte sur un complément absent de la liste, tu dois répondre : "❌ Ce complément n'est pas disponible chez NutriLabs.\n📬 Si vous souhaitez qu'il arrive rapidement, vous pouvez toujours en faire la demande."

Question : ${question}
Réponse :
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 400,
    });

    const response = completion.choices[0]?.message?.content;
    res.json({ response });
  } catch (err) {
    console.error('Erreur GPT :', err);
    res.status(500).json({ error: 'Erreur lors de l’appel à OpenAI' });
  }
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API NutriLabs 🤖');
});

app.listen(3001, () => {
  console.log('✅ Serveur NutriLabs lancé sur http://localhost:3001');
});
