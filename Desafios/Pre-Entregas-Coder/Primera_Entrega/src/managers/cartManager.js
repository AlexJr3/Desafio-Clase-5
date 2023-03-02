import fs from "fs";

class CartManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async getCarts() {
    try {
      const cart = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(cart);
    } catch (error) {
      return [];
    }
  }

  async getIDs() {
    const carts = await this.getCarts();
    const ids = products.map((el) => el.id);
    const mayorID = Math.max(...ids);

    if (mayorID === -Infinity) {
      return 0;
    } else {
      return ++mayorID;
    }
  }

  async addCart() {
    try {
      const newId = await this.getIDs();
      const carts = await this.getCarts();
      const newCart = { id: newId, products: [] };
      const cartsAdd = [...carts, newCart];
      await fs.promises.writeFile(this.#path, JSON.stringify(cartsAdd));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cartCheck = await carts.find((el) => el.id === id);

    if (!cartCheck) {
      throw new Error("Not Found");
    } else {
      return cartCheck;
    }
  }

  async addProductToCart(idCart, idProduct) {
    const carts = await this.getCarts();
    const cartId = await this.getCartById(idCart);
    const prodCart = await cartId.products.find((el) => el.id === idProduct);

    if (!prodCart) {
      cartId.products = [
        ...cartId.products,
        {
          id: idProduct,
          quantity: 1,
        },
      ];
    } else {
      cartId.products = [
        ...cartId.products,
        {
          id: idProduct,
          quantity: (prodCart.quantity += 1),
        },
      ];
    }
    const cartUpdate = await carts.map((el) => {
      if (el.id === idCart) {
        return {
          ...cartId,
        };
      }
      return el;
    });

    await fs.promises.writeFile(this.#path, JSON.stringify(cartUpdate));
  }
}
export default CartManager;
