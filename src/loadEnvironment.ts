import dotenv from "dotenv";

dotenv.config();

interface Environment {
  port: number;
  mongoDbUrl: string;
  jwtSecret: string;
  supabaseUrl: string;
  supabaseKey: string;
}

const {
  PORT: port,
  MONGODB_URL: mongoDbUrl,
  JWT_SECRET: jwtSecret,
  SUPABASE_URL: supabaseUrl,
  SUPABASE_KEY: supabaseKey,
} = process.env;

const environment: Environment = {
  port: +port,
  mongoDbUrl,
  jwtSecret,
  supabaseUrl,
  supabaseKey,
};

export default environment;
