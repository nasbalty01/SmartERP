const asyncHandler = require('express-async-handler');
const SaleOrder = require('../models/saleOrderModel');
const Product = require('../models/productModel');

// @desc    Create new order / quotation
// @route   POST /api/sales/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        status, // 'quotation' or 'sales_order'
        customerId,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new SaleOrder({
            orderItems,
            user: req.user._id,
            customer: customerId,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            status: status || 'quotation',
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/sales/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await SaleOrder.findById(req.params.id)
        .populate('user', 'name email')
        .populate('customer', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order status (e.g. convert quotation to sales_order)
// @route   PUT /api/sales/orders/:id/status
// @access  Private
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await SaleOrder.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;

        // If converting to sales_order, we might want to deduct stock here or in a separate 'confirm' step.
        // For now, simpler is better. Use a separate confirm endpoint if logic gets complex.

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get all orders
// @route   GET /api/sales/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await SaleOrder.find({}).populate('user', 'id name').populate('customer', 'name');
    res.json(orders);
});

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getOrders,
};
