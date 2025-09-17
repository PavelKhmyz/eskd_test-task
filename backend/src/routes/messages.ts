import { Router } from 'express';
import { z } from "zod";
import { validate } from '@middlewares/validateRequest.js';
import { messagesService } from '@services/messages.service.js';
import { asyncHandler } from '@utils/asyncHandler.js';

const router = Router();

const messageSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(11).max(13),
  message: z.string().min(1)
});

router.post('/', validate(messageSchema), asyncHandler(async (req, res) => {
  await messagesService.handleUserMessage(req.body);

  return res.status(200).json({
    code: 200,
    message: 'Success'
  });
}));

export default router;
