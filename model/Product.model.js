const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ClientSchema = new Schema({
  codigo:{type:Number, required:true}, 
  nome:{ type: String, required: true }, 
  cor:{ type: String, required: true }, 
  tamanho:{ type: String, required: true }, 
  valor:{ type: Number, required: true },
  active: {type :Boolean, default: true }
});

module.exports = mongoose.model("product", ClientSchema, "product");