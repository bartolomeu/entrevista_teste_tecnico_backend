const express = require("express");
const router = express.Router();

const productContr = require("../controller/Product.controller");

router.get("/", productContr.list);
router.post("/", [
  productContr.checkParams,
  productContr.create,
]);
router.get("/:id", productContr.detail);
router.put("/:id", [productContr.checkParams, productContr.update]);
router.delete("/:id", productContr.delete);

module.exports = router;