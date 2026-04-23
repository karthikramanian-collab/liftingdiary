import type { NextConfig } from 'next';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

// In the monorepo, .env lives at the root (one level above frontend/)
dotenvConfig({ path: path.join(process.cwd(), '../.env'), override: false });

const nextConfig: NextConfig = {
  transpilePackages: ['@liftingdiary/backend'],
};

export default nextConfig;
