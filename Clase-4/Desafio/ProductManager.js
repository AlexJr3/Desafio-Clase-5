const { log } = require('console');
const fs = require('fs');

class ProductManager{
    #path;
    #id = 0;
    constructor(path){
        this.#path = path;
    }

    async getProduct(){
        try {
            const product = await fs.promises.readFile(this.#path, 'utf-8');
            return JSON.parse(product);
        } catch (error) {
            return [];
        }
    }

    async idGenerators() {
        const products = await this.getProduct();
        const ids = await products.map((el) => el.id);
        if(ids.length === 0){
            return this.#id;
        }else{
            this.#id = Math.max(ids)+1;
            return this.#id;
        }
        
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = await this.getProduct();
        const codeCheck = await products.some((el) => el.code === code);
        const verificar = Object.values(products);

        if(verificar.includes(undefined)){
            throw new Error ('Falta llenar un campo');
        }

        else if(codeCheck){
            throw new Error(`ERROR!!! El codigo ${code} ya existe`);
        }

        const newProduct = {
            id: await this.idGenerators(), title, description, price, thumbnail, code, stock,
        }

        const productsUpdate = [...products, newProduct]
        fs.promises.writeFile(this.#path, JSON.stringify(productsUpdate));
        
    }

    async getProductById (idProduct) {
        const products = await this.getProduct();
        const productCheck = await products.find((el) => el.id === idProduct);
        if(!productCheck){
            throw new Error('Not found');
        }else{
            return productCheck;
        }
    }
    
    async updateProduct (productId, data){
        const products = await this.getProduct();

        const updateProduct = await products.map((el) => {
            if(el.id === productId){
                return {
                    ...el,
                    ...data,
                    id: el.id,
                }
            }
            return el;
        });

        

        await fs.promises.writeFile(this.#path, JSON.stringify(updateProduct));
        console.log('Producto modificado!');
    }

    async deleteProduct (productId) {
        const products = await this.getProduct();
        await this.getProductById(productId);
        const newProduct = await products.filter((el) => el.id !== productId);
        await fs.promises.writeFile(this.#path, JSON.stringify(newProduct));
    }
}


//Testing


async function main() {
    const manager = new ProductManager('./Products.json');
    
    const products = await manager.getProduct();

    
}
