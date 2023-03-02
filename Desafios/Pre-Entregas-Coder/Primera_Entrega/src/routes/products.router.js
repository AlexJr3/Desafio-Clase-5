//IMPORTS
import { json, Router } from "express";
import { manager } from "../app.js";

//VARIABLES
const productsRouter = Router();

//MIDDLEWARES
productsRouter.use(json());

//ENDPOINTS

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProduct();
    const { limit } = req.query;
    if (!limit) {
      res.status(200).send(products);
      return;
    }
    const productLimit = await products.slice(0, limit);
    res.status(200).send(productLimit);
  } catch (error) {
    res.status(404).send(`${error}`);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const productId = await manager.getProductById(pid);

    res.status(200).send(productId);
  } catch (error) {
    res.status(404).send(`${error}`);
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbail = [],
      code,
      stock,
      status = true,
      category,
    } = req.body;
    await manager.addProduct(
      title,
      description,
      parseInt(price),
      thumbail,
      code,
      parseInt(stock),
      status,
      category
    );

    res.status(200).send(req.body);
  } catch (error) {
    res.status(404).send({ error });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const data = req.body;
    await manager.updateProduct(pid, ...data);

    res.status(200).send(manager.getProductById(pid));
  } catch (error) {
    res.status(404).send({ error });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    await manager.deleteProduct(pid);
    res.status(200).send("Product deleted");
  } catch (error) {
    res.status(404).send({ error });
  }
});

export default productsRouter;
