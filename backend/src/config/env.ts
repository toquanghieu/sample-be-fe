/**
 * Load environment variables from .env file
 * This MUST be imported before any other modules that use env vars
 */
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

/**
 * Simple .env parser that handles various encodings
 */
function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {};

  // Remove BOM if present
  const cleanContent = content.replace(/^\uFEFF/, "");

  // Split by lines (handle both \n and \r\n)
  const lines = cleanContent.split(/\r?\n/);

  for (const line of lines) {
    // Skip empty lines and comments
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Find first = sign
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.substring(0, eqIndex).trim();
    let value = trimmed.substring(eqIndex + 1).trim();

    // Remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

// Find .env file
const envPath = resolve(process.cwd(), ".env");

if (existsSync(envPath)) {
  // Read file - detect encoding (UTF-8 or UTF-16)
  const buffer = readFileSync(envPath);
  let content: string;

  // Check for UTF-16 LE BOM (FF FE) or UTF-16 content (null bytes)
  if (buffer[0] === 0xff && buffer[1] === 0xfe) {
    content = buffer.toString("utf16le").slice(1);
  } else if (buffer.includes(0x00)) {
    content = buffer.toString("utf16le");
  } else {
    content = buffer.toString("utf8");
  }

  // Parse and apply to process.env
  const parsed = parseEnvFile(content);
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = value;
  }
}

export {};
