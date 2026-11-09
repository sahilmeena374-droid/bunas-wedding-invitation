// Optional platform bindings. The wedding invitation does not require Cloudflare
// services; use ordinary environment variables when running on Node/Vercel.
type AppEnv = {
  DB?: { prepare(sql: string): { first<T>(): Promise<T | null> } };
  HF_ENV?: string;
  APP_SLUG?: string;
};

export function bindings(): AppEnv {
  return {
    HF_ENV: process.env.HF_ENV,
    APP_SLUG: process.env.APP_SLUG,
  };
}
