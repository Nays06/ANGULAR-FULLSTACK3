const Product = require("../models/Product");

class ProductController {
  async addProduct(req, res) {
    try {
      const { name, price, description } = req.body;
  
      let imagePaths = '';
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          imagePaths += file.path + ',';
        });
        imagePaths = imagePaths.slice(0, -1); 
      } else {
        return res.status(400).json({ message: "Нет загруженных изображений" });
      }
  
    
      const product = new Product({
        name,
        description,
        price,
        image: imagePaths,
      });
  
      await product.save();
      return res.status(200).json("Продукт успешно добавлен!");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка добавления продукта" });
    }
  }
  
  async deleteOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByIdAndDelete({ "_id": id });
      res.json({message: "Product deleted", product});
    } catch (e) {}
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (e) {}
  }

  async getOneProduct(req, res) {
    console.log(req.params);
    
    try {
      const id = req.params.id;
      const product = await Product.findById({ "_id": id });
      res.json(product);
    } catch (e) {}
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const {title, price, description} = req.body;

      const product = await Product.findByIdAndUpdate({ "_id": id }, {title: title, price: price, description: description});
    
      
      res.status(200).json({message: "Продукт изменен"})
    } catch (e) {
      console.log(e);
    }
  }

 
}

module.exports = new ProductController();
