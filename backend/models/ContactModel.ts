import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        fname: { type: String, required: true },
        email: { type: String, required: true },
        telephone: { type: String, required: true },
        city: { type: String, required: true },
        message: { type: String, required: true },
        sentConfirmation: { type: Boolean, default: false },
        receivedEmail: { type: Boolean, default: false }
},
{
    timestamps: true,
}

);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;