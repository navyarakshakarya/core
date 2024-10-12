// @ravana/core/lib/env.ts
import * as dotenv from "dotenv";

let instance: Environment | null = null; // Singleton instance
export { instance as env }

export class Environment {
  
  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): Environment {
    if (!instance) {
      instance = new Environment();
      instance.load(); // Load the environment variables upon instantiation
    }
    return instance;
  }

  private load(): void {
    const fileName = "/config/.env";
    const configFile = __dirname + fileName;
    console.log(`Loading configuration from ${configFile}`);
    const result = dotenv.config({ path: configFile });
    if (result.error) {
      throw new Error(`Failed to load .env file: ${result.error.message}`);
    }
    console.log("Configuration loaded");
  }

  getStr(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  getInt(key: string): number {
    const value = this.getStr(key);
    return parseInt(value, 10);
  }

  getBool(key: string): boolean {
    const value = this.getStr(key);
    return value === "true";
  }
}
