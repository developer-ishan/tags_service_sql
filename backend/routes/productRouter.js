const express = require("express");
const productRouter = express.Router();
const {
  getProucts,
  getProuct,
  createProuct,
  editProuct,
  deleteProuct,
} = require("../services/productService");
productRouter.get("/product", getProucts);
productRouter.get("/product/:id", getProuct);
productRouter.post("/product", createProuct);
productRouter.put("/product/:id", editProuct);
productRouter.delete("/product/:id", deleteProuct);

module.exports = productRouter;
