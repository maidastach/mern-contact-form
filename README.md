# contact-form

Contact Form coded in TypeScript/React.js/Node.js/Express.js/MongoDB
It also include the dependencies Nodemailer to send the copy of the form to the sender and recipient

NODEMAILER has to be set with your email server before usage,
nodemailerOptions can be found in the backend/utils.ts file

this app has the following scripts:

    "installAllDependencies": install both backend and frontend dependencies
    "installFrontend": install only frontend dependencies
    "installBackend": install backend dependencies
    "build": compile the backend from TypeScript to the node supported JS through Babel
    "serve": run the Babel compiled sever.js
    "start": the only one you need to install all the dependencies, compile the backend code and run the server
