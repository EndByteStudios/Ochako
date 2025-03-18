import { Config } from "@lib/types";
import { readFileSync } from "fs";
import YAML from "yaml";

export function fetchConfig(path: string): Config {
    const configContent = readFileSync(path, "utf-8");
    const parsedConfig = YAML.parse(configContent);

    // Ensure the parsedConfig matches the Config type
    if (
        typeof parsedConfig.debug !== "boolean" ||
        typeof parsedConfig.environment !== "string"
    ) {
        throw new Error("Invalid configuration format");
    }

    return parsedConfig as Config;
}
