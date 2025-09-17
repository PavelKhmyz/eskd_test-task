import db from '@clients/database.js';
import type { QueryResultRow } from 'pg';

interface IPostgresRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  createOne(data: Partial<T>): Promise<void>;
  updateOne(id: number, data: Partial<T>): Promise<void>;
  deleteOne(id: number): Promise<boolean>;
}

export abstract class PostgresRepository<T extends QueryResultRow> implements IPostgresRepository<T> {
  protected abstract table: string;

  public async getAll(): Promise<T[]> {
    const result = await db.query<T>(`SELECT * FROM ${this.table}`);

    return result.rows;
  }

  public async getById(id: number): Promise<T | null> {
    const result = await db.query<T>(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  }

  public async createOne(data: Partial<T>): Promise<void> {
    const values = Object.values(data);
    const columns = Object.keys(data).join(', ');
    const placeholders =  values.map((value, index) => `$${index + 1}`).join(', ');

    await db.query<T>(
      `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      values
    );
  }

  public async updateOne(id: number, data: Partial<T>): Promise<void> {
    const fields = Object.keys(data);
    const setString = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = Object.values(data);

    await db.query<T>(
      `UPDATE ${this.table} SET ${setString} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
  }

  public async deleteOne(id: number): Promise<boolean> {
    const result = await db.query(
      `DELETE FROM ${this.table} WHERE id = $1`,
      [id]
    );

    return result.rowCount ? result.rowCount > 0 : false;
  }
}
