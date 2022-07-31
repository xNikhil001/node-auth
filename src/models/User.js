const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  }
})

userSchema.pre("save",async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();
})

const User = model('User',userSchema);

module.exports = User;