const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const tagRouter = require("./routes/tagRouter");
const productRouter = require("./routes/productRouter");
const filterRouter = require("./routes/filterRouter");
app.use("/api", tagRouter);
app.use("/api", productRouter);
app.use("/api", filterRouter);

const PORT = 8080;
app.listen(PORT, (x) => {
  console.log(`Server started at ${PORT}`);
});
