const express = require("express");
const router = express.Router();

const clientContr = require("../controller/Client.controller");

router.get("/", clientContr.list);
router.post("/", [
  clientContr.checkParams,
  clientContr.create,
]);
router.get("/:id", clientContr.detail);
router.put("/:id", [clientContr.checkParams, clientContr.update]);
router.delete("/:id", clientContr.delete);

module.exports = router;