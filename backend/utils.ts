import nodemailer from 'nodemailer';
import config from './config.js';

interface Validator
{
  (value: string, checker?: Validator): boolean
}

const emailRegExp: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//here you should configurate your email server configs
const nodemailerOptions =
{
    port: config.EMAIL_SERVER_PORT,
    host: config.EMAIL_SERVER,
    secure: true,
    auth: 
        {
            user: config.MY_EMAIL,
            pass: config.EMAIL_PASSWORD
        },
    tls: 
        {
            rejectUnauthorized: true
        },
    requireTLS: true,
}

export let transporter = nodemailer.createTransport(nodemailerOptions);

export const isNotEmpty: Validator = (value: string): boolean => 
{
    if
    (
      value.length > 0 
      && value != '' 
      && value != null 
      && value != undefined
    )
      return true;
    else
      return false;
};

export const validateEmail: Validator = (mail: string): boolean => 
{
  if(emailRegExp.test(mail.toLowerCase()))
    return true
  else
    return false
};

export const messageHasLength: Validator = (mess: string): boolean => 
{
  if(mess.length > 10)
    return true;
  else 
    return false;
};

export const numberCheck: Validator = (num: string): boolean => 
{
  if(num.length < 7)
    return false;
  for(let n of num)
  {
    if(isNaN(Number(n)))
      return false;
  }
  return true;
};

export const postalCodeCheck: Validator = (pCode: string): boolean =>
{
  if(pCode.length !== 4)
    return false;
  for(let n of pCode)
  {
    if (isNaN(Number(n)))
      return false;
  }
  return true;
};

export const isValid: Validator = (value: string, checker: Validator): boolean =>
{
  if(checker(value))
    return true;
  else
    return false;
}

export const emailFunction = (name: string, email: string, telephone: string, city: string, message: string): string => {
  const title = 'Thanks for contacting us!'
  const bodyA = `Hello ${name}, thanks for have spent some time to type a message, <br>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

                  Here is your Enquiry: <br>
                  Name: ${name}<br>
                  Email: ${email}<br>
                  Phone Number: ${telephone}<br>
                  City: ${city}<br>
                  Message:<br>
                  ${message}`;

  const bodyB = `Please do not reply to this email, if you want to you can text us at <br> email@email.email`;
  
  return `
  <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${title}</title>
              <style>
                  * {
                    box-sizing: border-box;
                  }
                  body {
                      font-family: 'Oxygen', sans-serif, Arial, Helvetica;
                      width: 90% !important;
                      margin: auto;
                  }
                  table {
                      width: 100%;
                  }
                  .logo {
                      background-image: url(https://image.shutterstock.com/image-photo/surreal-concept-roll-world-dice-260nw-1356798002.jpg) !important;
                      width: 20vmax !important;
                      height: 20vmax !important;
                      background-size: contain;
                      background-position: center;
                      background-repeat: no-repeat;
                  }
                  h1 {
                      font-size: 2vmax;
                  }
                  .footer {
                      background-image: url(https://image.shutterstock.com/image-photo/surreal-concept-roll-world-dice-260nw-1356798002.jpg) !important;
                      width: 10vmax !important;
                      height: 7vmax !important;
                      background-size: contain;
                      background-position: center;
                      background-repeat: no-repeat;
                      margin-left: auto;
                  }
              </style>
          </head>
          <body>
              <table>
                    <tr>

                        <td>
                            <a href="www.salderosa.com"><div class="logo"> </div></a>
                            <h1 style="text-align: center;margin: 0!important;">${title}</h1>
                        </td>
                    
                    </tr>
                    <tr >
                        <td >
                            <p style="margin: 2rem 0 !important;">${bodyA}
                            </p>
                            <br>
                            <br>
                            <p style="margin: 2rem 0 !important;"> 
                                ${bodyB}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <a href="www.github.com"><div class="footer"></div></a>
                        </td>
                        
                    </tr>   
              </table>
          </body>
      </html>
`;
}