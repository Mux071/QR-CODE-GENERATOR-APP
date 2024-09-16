require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const QRCode = require("qrcode");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!qrcode")) {
    const text = message.content.replace("!qrcode ", "").trim();

    if (!text) {
      return message.reply("Please provide text to generate a QR code.");
    }

    try {
      // Generate QR code as a buffer (no need to convert from DataURL)
      const qrCodeBuffer = await QRCode.toBuffer(text);

      // Send the QR code image as an attachment
      message.reply({
        files: [
          {
            attachment: qrCodeBuffer,
            name: "qrcode.png",
          },
        ],
      });
    } catch (err) {
      console.error(err); // Log error to console for debugging
      message.reply("Failed to generate QR code.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
