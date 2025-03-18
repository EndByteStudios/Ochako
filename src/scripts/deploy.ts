import { Command } from "@lib/types";
import { env, logger, traverse } from "@lib/utils";
import { APIUser, REST, Routes } from "discord.js";
import path from "node:path";

export async function fetchCommands(path: string) {
    const commands = (await traverse(path)) as Command[];

    return commands.flat();
}

const rest = new REST().setToken(env("CLIENT_TOKEN"));
const content = fetchCommands(path.join(__dirname, "../commands"));

async function deploy() {
    const user = (await rest.get(Routes.user())) as APIUser;
    const endpoint =
        env("NODE_ENV") === "production"
            ? Routes.applicationCommands(env("CLIENT_ID"))
            : Routes.applicationGuildCommands(
                  env("CLIENT_ID"),
                  env("DISCORD_GUILD_ID"),
              );

    await rest.put(endpoint, { body: await content });

    return user;
}

deploy()
    .then((user) => {
        const tag = `${user.username}`;
        const response =
            env("NODE_ENV") === "production"
                ? `Successfully registered commands in production as ${user.username}`
                : `Successfully registered commands for development as ${user.username}`;

        logger.info(response);
    })
    .catch(console.error);
