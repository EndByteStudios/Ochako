import { Client } from "@/ochako";
import { env, logger } from "@lib/utils";
import { GatewayIntentBits as Intents } from "discord.js";
import path from "node:path";

const client = new Client({
    intents: [Intents.Guilds, Intents.GuildMessages, Intents.GuildMembers],
    eventsPath: path.join(__dirname, "events"),
    commandsPath: path.join(__dirname, "commands"),
});

client.login(env("CLIENT_TOKEN")).then(() => {
    logger.debug("Client Token has been logged in");
});
client.registerEvents();
client.registerCommands();
