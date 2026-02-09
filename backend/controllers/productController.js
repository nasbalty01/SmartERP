const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// @desc    Get all products
// @route   GET /api/inventory/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category', 'name');
    res.json(products);
});

// @desc    Get single product
// @route   GET /api/inventory/products/:id
// @access  Private
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/inventory/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, description, price, cost, quantity, category, image } = req.body;

    const productExists = await Product.findOne({ sku });

    if (productExists) {
        res.status(400);
        throw new Error('Product with this SKU already exists');
    }

    const product = await Product.create({
        name,
        sku,
        description,
        price,
        cost,
        quantity,
        category,
        image,
    });

    res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/inventory/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    const { name, sku, description, price, cost, quantity, category, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.sku = sku || product.sku;
        product.description = description || product.description;
        product.price = price || product.price;
        product.cost = cost || product.cost;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/inventory/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get all categories
// @route   GET /api/inventory/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});

// @desc    Create a category
// @route   POST /api/inventory/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name,
        description,
    });

    res.status(201).json(category);
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    createCategory,
};
