const PORT = process.env.PORT || 8000;
const connection = require("./src/config/db.js");
const app = require("./server.js");

// Database connection
connection();

// LISTEN TO SERVER 
app.listen(PORT,()=>{
  console.log("app running on port " + PORT);
});