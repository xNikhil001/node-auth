const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connection = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI,options);
    console.log("Connected to database");
  } catch (err) {
    console.log(err)
  }
};

module.exports = connection;