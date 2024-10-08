import { z } from "zod";

export const envSchema = z.object({
  EXPO_PUBLIC_BACKEND_URL: z.string().url(),
  EXPO_PUBLIC_API_KEY: z.string(),
  EXPO_PUBLIC_AUTH_DOMAIN: z.string(),
  EXPO_PUBLIC_PROJECT_ID: z.string(),
  EXPO_PUBLIC_STORAGE_BUCKET: z.string(),
  EXPO_PUBLIC_MESSAGING_SENDER_ID: z.string(),
  EXPO_PUBLIC_APP_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
