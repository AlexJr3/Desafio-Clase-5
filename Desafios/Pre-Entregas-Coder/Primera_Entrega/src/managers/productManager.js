import fs from "fs";

class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async getProduct() {
    try {
      const product = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(product);
    } catch (error) {
      return [];
    }
  }

  async getIDs() {
    const products = await this.getProduct();
    const ids = products.map((prods) => prods.id);
    const mayorID = Math.max(...ids);

    if (mayorID === -Infinity) {
      return 0;
    } else {
      return ++mayorID;
    }
  }

  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category
  ) {
    const products = await this.getProduct();
    const codeCheck = await products.some((el) => el.code === code);
    let newId = await this.getIDs();
    const verificar = Object.values(products);

    if (verificar.includes(undefined)) {
      throw new Error("Falta llenar un campo");
    } else if (codeCheck) {
      throw new Error(`ERROR!!! El codigo ${code} ya existe`);
    }

    const newProduct = {
      id: newId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    };

    const productsUpdate = [...products, newProduct];
    fs.promises.writeFile(this.#path, JSON.stringify(productsUpdate));
  }

  async getProductById(idProduct) {
    const products = await this.getProduct();
    const productCheck = await products.find((el) => el.id === idProduct);
    if (!productCheck) {
      throw new Error("Not found");
    } else {
      return productCheck;
    }
  }

  async updateProduct(productId, data) {
    const products = await this.getProduct();

    const updateProduct = await products.map((el) => {
      if (el.id === productId) {
        return {
          ...el,
          ...data,
          id: el.id,
        };
      }
      return el;
    });

    await promises.writeFile(this.#path, JSON.stringify(updateProduct));
    console.log("Producto modificado!");
  }

  async deleteProduct(productId) {
    const products = await this.getProduct();
    await this.getProductById(productId);
    const newProduct = await products.filter((el) => el.id !== productId);
    await promises.writeFile(this.#path, JSON.stringify(newProduct));
  }
}

export default ProductManager;
