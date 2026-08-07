import "server-only";

import { serverEnv } from "@/config/env";
import { ApiClient } from "./client";

export const serverApiClient = new ApiClient({
  baseUrl: serverEnv.SERVER_API_URL || serverEnv.NEXT_PUBLIC_API_URL
});
