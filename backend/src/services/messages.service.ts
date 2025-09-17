import { messagesRepository } from '@repositories/messages.repository.js';
import type { IMessage } from '@repositories/messages.repository.js';

class MessagesService {
  private messageRepository = messagesRepository;

  public async handleUserMessage(userMessage: Omit<IMessage, 'id'>): Promise<void> {
    await this.messageRepository.createOne(userMessage);
  }
}

export const messagesService = new MessagesService();
