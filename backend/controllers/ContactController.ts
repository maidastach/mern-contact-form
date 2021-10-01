import express from 'express';
import Contact from '../models/ContactModel';
import { transporter } from '../utils';
import { emailFunction, isNotEmpty, isValid, messageHasLength, numberCheck, validateEmail } from '../utils';

export const postContactForm = async(req: express.Request, res: express.Response, next: express.NextFunction) => 
{
    const { name, email, telephone, city, message } = req.body;
    if (
          isValid(name, isNotEmpty)
          && isValid(email, validateEmail)
          && isValid(telephone, numberCheck)
          && isValid(city, isNotEmpty)
          && isValid(message, messageHasLength)
      
        )
    {
        const contact = new Contact(
            {
                name,
                email,
                telephone,
                city,
                message,
            }
        );
        const createdContact = await contact.save();
    
        if(!createdContact)
            return res.status(401).send({ message: 'Error Processing Data, Form NOT Sent' })

        let mailOptions = 
        {
            from: 'Salvatore- NO REPLY no-reply@salderosa.com',
            to: email,
            subject: `Contact form n. ${contact._id.toString()}`,
            html: emailFunction(name, email, telephone, city, message),
        }

        //send copy to the USer contacting us
        transporter.sendMail(
            mailOptions, 
            async(err, data) =>
            {
                if(err)
                {
                    await Contact.findByIdAndUpdate(contact._id, { sentConfirmation: false })
                    return res.status(401).send({ message: 'Message NOT sent!<br><br>Please check your email address is correct' })
                }
                await Contact.findByIdAndUpdate(contact._id, { sentConfirmation: true })
            }
        )

        //send actual contact form to ourselves
        transporter.sendMail(
            {
                from: email,
                to: 'my@mail.com',
                subject: `Contact request n. ${contact._id}`,
                html: ` Name: ${name}<br>
                        Email: ${email}<br>
                        Phone Number: ${telephone}<br>
                        City: ${city}<br>

                        <br><br><br>

                        Message:<br>
                        ${message}`,
            }, 
            async(err, data) => 
            {
                if(err)
                {
                    await Contact.findByIdAndUpdate(contact._id, { receivedEmail: false })
                    return res.status(401).send({ message: 'Message NOT sent!<br><br>Please check your email address is correct' })
                }
                await Contact.findByIdAndUpdate(contact._id, { receivedEmail: true }) 
            }
        )
        
        return res.send({ message: 'Thanks for Contacting US' })
    }
    
    return res.status(400).send({ message: 'Details Incorrect, Form NOT sent' });
}