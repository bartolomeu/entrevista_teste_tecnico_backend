const express = require("express");
const router = express.Router();

const orderContr = require("../controller/Order.controller");

router.get("/", orderContr.list);
router.post("/", [orderContr.checkParams, orderContr.create]);
router.post("/:id/sendmail", orderContr.sendEmail);
router.get("/:id", orderContr.detail);
router.put("/:id", [orderContr.update]);
router.delete("/:id", orderContr.delete);

module.exports = router;
