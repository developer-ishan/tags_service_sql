const express = require("express");
const filterRouter = express.Router();
const { filterProducts } = require("../services/filterService");

filterRouter.get("/filter/products", filterProducts);

module.exports = filterRouter;
