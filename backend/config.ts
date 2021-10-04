import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    MY_EMAIL: process.env.MY_EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_SERVER_PORT: parseInt(process.env.EMAIL_SERVER_PORT),
    WHERE_I_RECEIVE_FORM: process.env.WHERE_I_RECEIVE_FORM,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL
};