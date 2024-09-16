const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

// Function to escape user input (optional security improvement)
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Route to generate QR Code
app.get('/generate', async (req, res) => {
  const text = req.query.text ? escapeHtml(req.query.text) : null; // Escape input

  if (!text) {
    return res.status(400).send('Text query parameter is required');
  }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    res.setHeader('Content-Type', 'text/html'); // Explicitly set the content type
    res.send(`<img src="${qrCodeDataUrl}" alt="QR Code" />`);
  } catch (err) {
    res.status(500).send(`Error generating QR Code: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
