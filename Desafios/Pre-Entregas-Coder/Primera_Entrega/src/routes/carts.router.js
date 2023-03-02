//IMPORTS
import { json, Router } from "express";
import { cartManager, manager } from "../app.js";

//VARIABLES
const cartsRouter = Router();

//MIDDLEWARES
cartsRouter.use(json());

cartsRouter;
