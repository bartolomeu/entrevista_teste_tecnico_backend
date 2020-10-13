const ClientModel = require("../model/Client.model");

exports.list = (req, res) => {
  ClientModel.find({active:true}, (err, data) => {
    if (err){
      console.log(err)
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
  if (!req.body.nome) {
    console.log("req.body.nome empty");
    validate.push("Nome está vazio");
  }
  if (!req.body.cpf) {
    console.log("req.body.cpf empty");
    validate.push("CPF está vazio");
  }else{
    if(req.body.cpf.length != 11)
      validate.push("CPF não contém 11 caracteres")
  }
  if (!req.body.email) {
    console.log("req.body.email empty");
    validate.push("Email está vazio");
  } else {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(req.body.email)) validate.push("Email é inválido");
  }


  if (validate.length > 0) return res.status(400).send({ errors: validate });

  next();
};

exports.create = function (req, res) {
  const client = new ClientModel({
    codigo: req.body.codigo,
    nome: req.body.nome,
    cpf: req.body.cpf,
    sexo: req.body.sexo,
    email: req.body.email,
  });

  client.save((err, clientSaved) => {
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
      msg: "Registo de cliente criado com sucesso",
      data:clientSaved
    });
  });
};

exports.update = (req, res) => {
  const newData = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    sexo: req.body.sexo,
    email: req.body.email,
  };

  ClientModel.findByIdAndUpdate(req.params.id, newData, (err) => {
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
      msg: "Registo de usuario atualizado com sucesso",
    });
  });

};

exports.delete = async (req, res) => {
  try {
    const cli = await ClientModel.findOneAndUpdate(
      { _id: req.params.id },
      { active: false }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
  res.send({ msg: "ok" });
};

exports.detail = (req, res) => {
  ClientModel.findById(req.params.id, (err, data) => {
    if (err) return res.sendStatus(500);
    delete data.password;
    res.send(data);
  });
};