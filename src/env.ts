
import dotenv from 'dotenv';

import { z } from 'zod';

dotenv.config();


const envSchema = z.object({
    NODE_ENV: z.enum(['dev','test','prod'], 'valor de ambiente inesperado').default('dev'),
    PORT: z.coerce.number().int().positive().min(1).max(65535).default(3000),
    DATABASE_URL: z.url().startsWith('postgresql://'),
    JWT_SECRET: z.string().min(32, 'mínimo de 32 caracteres'),
    ENABLE_CACHE: z.enum(['true','false'], 'valor inesperado').default('false').transform((v) => v === 'true')
})


export const env = envSchema.parse(process.env)
