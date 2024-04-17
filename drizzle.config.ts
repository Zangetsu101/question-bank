import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!
  },
  verbose: true,
  strict: true
} satisfies Config