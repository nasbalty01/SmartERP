const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategories,
    createCategory,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/products').get(protect, getProducts).post(protect, createProduct);
router
    .route('/products/:id')
    .get(protect, getProductById)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

router.route('/categories').get(protect, getCategories).post(protect, createCategory);

module.exports = router;
