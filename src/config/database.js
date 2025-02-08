import { createClient } from '@libsql/client'
import 'dotenv/config'

const turso = {
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
}

export const db = createClient(turso)
