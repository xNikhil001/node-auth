Node-Auth: 
=========

This is a simple user authentication app built with Node+ExpressJs,MongoDB and other necessary libraries

FOLDER INFO: 
/node-auth/app.js <-- app entry point

/node-auth/src <-- contains server side code

/node-auth/views <-- contains UI pages

/node-auth/public <-- contains static files and style sheet

SCRIPT INFO:

npm run dev - starts development server

npm start - starts app

NOTES:
-- Please make a .env file in root folder which includes
   -- MONGO_URI - mongodb url
   -- SECRET - JWT secret (openssl rand -base64 32)
   
-- The app does not implement any testing libraries

-- The "@" symbol appears in empty Email field after request is due to normalizeEmail() sanitization