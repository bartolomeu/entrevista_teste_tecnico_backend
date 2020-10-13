const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ClientSchema = new Schema({
  codigo:{type:Number, required:true}, 
  nome:{ type: String, required: true }, 
  cpf:{ type: String, required: true }, 
  sexo:String, 
  email:{ type: String, required: true },
  active: {type :Boolean, default: true }
});

module.exports = mongoose.model("client", ClientSchema, "client");