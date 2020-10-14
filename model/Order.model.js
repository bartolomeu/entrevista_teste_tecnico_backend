const mongoose = require("mongoose");
const { TypePaymentEnum } = require("./TypePaymentEnum");

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  codigo: { type: Number, required: true },
  client: {
    _id: String,
    nome: String,
  },
  itens: [
    {
      _id: String,
      nome: String,
      cor: { type: String },
      tamanho: { type: String },
      valor: { type: Number },
      qtd: Number,
    },
  ],

  date: { type: Date, required: true, default: Date.now },
  typePayment: {
    type: String,
    required: true,
    enum: ["Dinheiro", "CartaoCredito", "CartaoDebito", "Cheque"],
  },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("order", OrderSchema, "order");
