const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Page principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Generate API
app.post("/generate", async (req, res) => {

  const data = req.body;

  const lockedRules = `
Always centered.
Resolution 800x1000px.
Cinematic lighting.
Real skin texture.
Shallow depth of field.
50mm lens.
Sunglasses from attached image must be placed on face.
Sunglasses are main focus.
Never describe sunglasses as outfit.
Output ONLY in English.
Professional photography.
`;

  const prompt = `
Age: ${data.age}
Genre: ${data.genre}
Top: ${data.haut}
Bottom: ${data.bas}
Environment: ${data.fond}
Camera Angle: ${data.angle}

${lockedRules}
`;

  res.json({ prompt });

});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
