export const DATABASE_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  name: process.env.DB_NAME,
};

export const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === 'TRUE';

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const { BASE_URL } = process.env;
