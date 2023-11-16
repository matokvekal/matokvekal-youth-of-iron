import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_URL: z.string().min(1),
    APP_PUBLIC_URL: z.string().min(1),
    APP_INSIGHT_CONNECTION_STRING: z.string().optional(),
  },
  runtimeEnv: {
    APP_INSIGHT_CONNECTION_STRING: process.env.APP_INSIGHT_CONNECTION_STRING,
    API_URL: process.env.API_URL,
    APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
  },
  skipValidation: false,
});
