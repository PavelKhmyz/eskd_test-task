import pkg from 'pg';
import type { QueryResult, QueryResultRow, PoolConfig } from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
} as PoolConfig);

export default {
  query: <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> => {
    return pool.query<T>(text, params)
  },
};
