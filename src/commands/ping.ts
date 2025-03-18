import { createCommand } from "@handlers/commandHandler";
import { CommandType } from "@lib/types";
import { MessageFlags } from "discord.js";

export default createCommand({
    name: "ping",
    description: "A ping pong command",
    type: CommandType.CHAT_INPUT,
    interact: (client, interaction) => {
        return interaction.reply({
            content: `<:ochakoassist:1350721665130037259> My current latency is ${client.ws.ping}ms`,
            flags: [MessageFlags.Ephemeral],
        });
    },
});
