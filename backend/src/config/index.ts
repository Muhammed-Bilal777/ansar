import * as dotenv from 'dotenv';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });
export const config = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL || '',
  nodeEnv: env,
};
