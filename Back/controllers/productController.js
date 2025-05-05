const Product = require("../models/Product");
const User = require("../models/User");

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
    } catch (e) {
      res.status(500).json({message: "Ошибка удаления"})
      console.log(e);
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (e) {
      res.status(500).json({message: "Ошибка выдачи продуктов"})
      console.log(e);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById({ "_id": id });
      res.json(product);
    } catch (e) {
      res.status(500).json({message: "Ошибка выдачи одного продукта"})
      console.log(e);
    }
  }

  async updateProduct(req, res) {
    try {
      const user = await User.findById(req.user.id)
      const id = req.params.id;
      const {name, price, description} = req.body;

      const product = await Product.findByIdAndUpdate({ "_id": id }, { name: name, price: price, description: description });
    
      
      res.status(200).json({message: "Продукт изменен"})
    } catch (e) {
      res.status(500).json({message: "Ошибка изменения"})
      console.log(e);
    }
  }
}

module.exports = new ProductController();
