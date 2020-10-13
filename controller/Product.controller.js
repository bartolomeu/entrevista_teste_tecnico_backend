const ProductModel = require("../model/Product.model");

exports.list = (req, res) => {
  ProductModel.find({active:true}, (err, data) => {
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
  if (!req.body.cor) {
    console.log("req.body.cor empty");
    validate.push("COR está vazio");
  }
  if (!req.body.tamanho) {
    console.log("req.body.tamanho empty");
    validate.push("Tamanho está vazio");
  }  
  if (!req.body.valor) {
    console.log("req.body.valor empty");
    validate.push("Valor está vazio");
  }


  if (validate.length > 0) return res.status(400).send({ errors: validate });

  next();
};

exports.create = function (req, res) {
  const product = new ProductModel({
    codigo: req.body.codigo,
    nome: req.body.nome,
    cor: req.body.cor,
    tamanho: req.body.tamanho,
    valor: req.body.valor,
  });

  product.save((err, productSaved) => {
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
      msg: "Registo do produto criado com sucesso",
      data:productSaved
    });
  });
};

exports.update = (req, res) => {
  const product = new ProductModel({
    codigo: req.body.codigo,
    nome: req.body.nome,
    cor: req.body.cor,
    tamanho: req.body.tamanho,
    valor: req.body.valor,
  });

  ProductModel.findByIdAndUpdate(req.params.id, product, (err) => {
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
      msg: "Registo de produto atualizado com sucesso",
    });
  });

};

exports.delete = async (req, res) => {
  try {
    const cli = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      { active: false }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
  res.send({ msg: "ok" });
};

exports.detail = (req, res) => {
  ProductModel.findById(req.params.id, (err, data) => {
    if (err) return res.sendStatus(500);
    delete data.password;
    res.send(data);
  });
};