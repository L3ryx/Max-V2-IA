const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const HF_TOKEN = process.env.Banana; // Ta clé render
const HF_API = "https://api-inference.huggingface.co/models/gpt2";

/* ===============================
   ROUTE PAGE
=================================*/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===============================
   GENERATION IA
=================================*/

app.post("/generate", async (req, res) => {

  const { genre, age, haut, bas, fond, angle, autoMode } = req.body;

  let basePrompt = `
Create a Nano Banana ultra realistic prompt.

Age: ${age}
Gender: ${genre}
Top: ${haut}
Bottom: ${bas}
Background: ${fond}
Angle: ${angle}

Rules:
- 800x1000px
- Cinematic lighting
- Professional photography
- Banana aesthetic
`;

  if (autoMode) {
    basePrompt += "\nGenerate creative random elements and new sentences.";
  }

  try {

    const response = await fetch(HF_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: basePrompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 1.2,
          top_p: 0.95,
          do_sample: true
        }
      })
    });

    const data = await response.json();

    res.json({
      prompt: data[0]?.generated_text || basePrompt
    });

  } catch (err) {
    res.json({ prompt: "🔥 IA ERROR" });
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server Running"));
