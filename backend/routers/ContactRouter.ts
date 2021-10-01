import express from 'express';
import asyncHandler from 'express-async-handler';
import { postContactForm } from '../controllers/ContactController';

const ContactRouter: express.IRouter = express.Router();

ContactRouter.post('/', asyncHandler(postContactForm))

export default ContactRouter;