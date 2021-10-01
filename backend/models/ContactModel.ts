import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        telephone: { type: String, required: true },
        city: { type: String, required: true },
        message: { type: String, required: true },
        sentConfirmation: { type: Boolean },
        receivedEmail: { type: Boolean }
},
{
    timestamps: true,
}

);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;