import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    YourSecretEmail: process.env.YourSecretEmail,
    PasswordToSendEmail: process.env.PasswordToSendEmail,
};