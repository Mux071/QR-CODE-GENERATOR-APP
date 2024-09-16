const express = require("express");
const QRCode = require("qrcode");
const app = express();
const port = 3000;

app.get("/generate", async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).send("Text query parameter is required");
  }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    res.send(`<img src="${qrCodeDataUrl}" alt="QR Code" />`);
  } catch (err) {
    res.send(`Error generating QR Code: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});