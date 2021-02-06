import { EnvType, load } from 'ts-dotenv';
 
export type Env = EnvType<typeof schema>;
 
export const schema = {
    SQUARE_ACCESS_TOKEN: String,
    AUTH0_CLIENT_ID: String,
    AUTH0_DOMAIN: String,
    AUTH0_CLIENT_SECRET: String,
    EXPRESS_SESSION_SECRET: String,
    NODE_ENV: ["production" as const, "development" as const],
};
 
export let env: Env;
 
export function loadEnv(): void {
    env = load(schema);
}