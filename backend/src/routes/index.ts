import { Router } from 'express';
import messages from '@routes/messages.js';

const router = Router();

router.use('/messages', messages);

export default router;
