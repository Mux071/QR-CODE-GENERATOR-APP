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

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!qrcode")) {
    const text = message.content.slice(8).trim(); // Remove '!qrcode ' prefix

    if (!text) {
      return message.reply("Please provide text to generate a QR code.");
    }

    try {
      const qrCodeBuffer = await QRCode.toBuffer(text); // Generate QR code
      message.reply({
        files: [{ attachment: qrCodeBuffer, name: "qrcode.png" }],
      });
    } catch (err) {
      console.error(err);
      message.reply("Failed to generate QR code.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);