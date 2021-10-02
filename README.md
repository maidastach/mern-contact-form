# contact-form

RESPONSIVE Contact Form coded in TypeScript/React.js/Node.js/Express.js/MongoDB

Validation on Change of each value

It also include the dependencies Nodemailer to send the copy of the form to the sender and recipient

NODEMAILER has to be set with your email server before usage,
nodemailerOptions can be found in the backend/utils.ts file

YOU need to set up you local MongoDB
setting the string connection in the .env as:
MONGODB_URL=mongodb://localhost:27017/<yourDB>

this app has the following scripts:

    "installAllDependencies": install both backend and frontend dependencies
    "installFrontend": install only frontend dependencies
    "installBackend": install backend dependencies
    "build": compile the backend from TypeScript to the node supported JS through Babel AND build the React app
    "serve": run the Babel compiled sever.js
    "start": the only one you need to install all the dependencies, compile the backend code and run the server
