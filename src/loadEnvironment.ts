import dotenv from "dotenv";

dotenv.config();

interface Environment {
  port: number;
  debug: string;
  mongoDebug: boolean;
  mongoDbUrl: string;
  jwtSecret: string;
  supabaseUrl: string;
  supabaseKey: string;
  uploadPath: string;
  supabaseBucket: string;
}

const {
  PORT: port,
  DEBUG: debug,
  MONGO_DEBUG: mongoDebug,
  MONGODB_URL: mongoDbUrl,
  JWT_SECRET: jwtSecret,
  SUPABASE_URL: supabaseUrl,
  SUPABASE_KEY: supabaseKey,
  UPLOAD_PATH: uploadPath,
  SUPABASE_BUCKET: supabaseBucket,
} = process.env;

const environment: Environment = {
  port: +port,
  debug,
  mongoDebug: mongoDebug === "true",
  mongoDbUrl,
  jwtSecret,
  supabaseUrl,
  supabaseKey,
  supabaseBucket,
  uploadPath,
};

export default environment;
