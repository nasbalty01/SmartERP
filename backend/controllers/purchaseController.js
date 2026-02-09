const asyncHandler = require('express-async-handler');
const Vendor = require('../models/vendorModel');
const PurchaseOrder = require('../models/purchaseOrderModel');

// @desc    Get all vendors
// @route   GET /api/purchase/vendors
// @access  Private
const getVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find({});
    res.json(vendors);
});

// @desc    Create a vendor
// @route   POST /api/purchase/vendors
// @access  Private
const createVendor = asyncHandler(async (req, res) => {
    const { name, email, phone, address, company, website } = req.body;

    const vendor = await Vendor.create({
        name,
        email,
        phone,
        address,
        company,
        website,
    });

    res.status(201).json(vendor);
});

// @desc    Create purchase order
// @route   POST /api/purchase/orders
// @access  Private
const createPurchaseOrder = asyncHandler(async (req, res) => {
    const { vendorId, orderItems, totalCost } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new PurchaseOrder({
            vendor: vendorId,
            orderItems,
            user: req.user._id,
            totalCost,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get all purchase orders
// @route   GET /api/purchase/orders
// @access  Private
const getPurchaseOrders = asyncHandler(async (req, res) => {
    const orders = await PurchaseOrder.find({}).populate('vendor', 'name').populate('user', 'name');
    res.json(orders);
});

// @desc    Update PO status (e.g. mark as received)
// @route   PUT /api/purchase/orders/:id/status
// @access  Private
const updatePurchaseOrderStatus = asyncHandler(async (req, res) => {
    const order = await PurchaseOrder.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        if (req.body.status === 'received') {
            order.isReceived = true;
            order.receivedAt = Date.now();
            // Logic to increase stock in Product model could go here
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

module.exports = {
    getVendors,
    createVendor,
    createPurchaseOrder,
    getPurchaseOrders,
    updatePurchaseOrderStatus,
};
