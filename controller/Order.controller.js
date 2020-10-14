const OrderModel = require("../model/Order.model");
const TypePaymentEnum = require("../model/TypePaymentEnum");

exports.list = (req, res) => {
  OrderModel.find({ active: true }, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(data);
  });
};

exports.checkParams = (req, res, next) => {
  const validate = [];

  if (!req.body.codigo) {
    console.log("req.body.codigo empty");
    validate.push("Código está vazio");
  }
  if (req.method == "POST" && !req.body.client._id) {
    console.log("req.body.client._id empty");
    validate.push("ID do Cliente está vazio");
  }
  if (!req.body.client.nome) {
    console.log("req.body.client.nome empty");
    validate.push("Nome do Cliente está vazio");
  }

  if (
    !req.body.itens ||
    !Array.isArray(req.body.itens) ||
    req.body.itens.length == 0
  ) {
    console.log("req.body.itens empty");
    validate.push("Não há itens neste pedido");
  } else {
    req.body.itens.forEach((elm, ind) => {
      if (!elm._id) {
        validate.push(`Item N°: ${ind} - não possui ID`);
      }
      if (!elm.nome) {
        validate.push(`Item N°: ${ind} - não possui nome informado`);
      }
      if (!elm.cor) {
        validate.push(`Item N°: ${ind} - não possui cor`);
      }
      if (!elm.tamanho) {
        validate.push(`Item N°: ${ind} - não possui tamanho`);
      }
      if (!elm.valor) {
        validate.push(`Item N°: ${ind} - não possui valor`);
      }
      if (!elm.qtd) {
        validate.push(`Item N°: ${ind} - não possui quantidade informada`);
      }
    });
  }

  if (!req.body.typePayment) {
    console.log("req.body.typePayment empty");
    validate.push("Tipo de Pagamento está vazio");
  } else {
    if (!TypePaymentEnum.includes(req.body.typePayment)) {
      validate.push("Tipo de Pagamento inválido");
    }
  }
  if (validate.length > 0) return res.status(400).send({ errors: validate });

  next();
};

exports.create = function (req, res) {
  const order = new OrderModel({
    codigo: req.body.codigo,
    client: {
      _id: req.body.client._id,
      nome: req.body.client.nome,
    },
    itens: req.body.itens,
    typePayment: req.body.typePayment,
  });

  order.save((err, OrderSaved) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        ok: false,
        msg: "Não foi possivel acessar a base de dados",
        error: err,
      });
    }
    res.send({
      ok: true,
      msg: "Pedido criado com sucesso",
      data: OrderSaved,
    });
  });
};

exports.update = (req, res) => {
  OrderModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        ok: false,
        msg: "Não foi possivel acessar a base de dados",
        error: err,
      });
    }
    res.send({
      ok: true,
      msg: "Pedido atualizado com sucesso",
    });
  });
};

exports.delete = async (req, res) => {
  try {
    console.log(req.params.id);
    const cli = await OrderModel.findOneAndUpdate(
      { _id: req.params.id },
      { active: false }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
  res.send({ msg: "ok" });
};

exports.detail = (req, res) => {
  OrderModel.findById(req.params.id, (err, data) => {
    if (err) return res.sendStatus(500);
    delete data.password;
    res.send(data);
  });
};
