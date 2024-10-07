import { z } from "zod";

export const envSchema = z.object({
  EXPO_PUBLIC_BACKEND_URL: z.string().url(),
  API_KEY: z.string(),
  AUTH_DOMAIN: z.string(),
  PROJECT_ID: z.string(),
  STORAGE_BUCKET: z.string(),
  MESSAGING_SENDER_ID: z.string(),
  APP_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
