const Router = require("express");
const router = new Router();
const productController = require("./productController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require('../middlewares/upload.js')

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.post("/addProduct", upload.array('image', 10),  productController.addProduct);
router.delete("/delproduct/:id", productController.deleteOneProduct);
router.patch("/update/:id", authMiddleware, productController.updateProduct);

module.exports = router;
