//IMPORTS
import express from "express";
import __dirname from "./utils.js";
import ProductManager from "./managers/productManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./managers/cartManager.js";

//VARIABLES
const app = express();
const manager = new ProductManager("./src/jsons/products/Products.json");
const cartManager = new CartManager("./src/jsons/carts/Carts.json");
//MIDDLEWARES
app.use("/api/products/", productsRouter);

app.listen(8080, () => {
  console.log("Server listening in port 8080");
});

export { manager, cartManager };
