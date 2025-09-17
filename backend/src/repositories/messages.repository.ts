import { PostgresRepository } from '@repositories/postgres.repository.js';

export interface IMessage {
  id: number;
  name: string;
  phone: string;
  message: string;
}

class MessagesRepository extends PostgresRepository<IMessage> {
  protected table = 'public.messages';
}

export const messagesRepository = new MessagesRepository();
