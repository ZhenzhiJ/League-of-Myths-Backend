import dotenv from "dotenv";

dotenv.config();

interface Environment {
  port: number;
  debugApp: string;
  mongoDbUrl: string;
  jwtSecret: string;
  supabaseUrl: string;
  supabaseKey: string;
}

const {
  PORT: port,
  DEBUG: debugApp,
  MONGODB_URL: mongoDbUrl,
  JWT_SECRET: jwtSecret,
  SUPABASE_URL: supabaseUrl,
  SUPABASE_KEY: supabaseKey,
} = process.env;

const environment: Environment = {
  port: +port,
  debugApp,
  mongoDbUrl,
  jwtSecret,
  supabaseUrl,
  supabaseKey,
};

export default environment;
