const asyncHandler = require('express-async-handler');
const Invoice = require('../models/invoiceModel');
const SaleOrder = require('../models/saleOrderModel');
const PurchaseOrder = require('../models/purchaseOrderModel');

// @desc    Create an invoice (from Sale or Purchase Order)
// @route   POST /api/accounting/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
    const { type, referenceId, dueDate } = req.body;

    let order;
    let onModel;
    let amount;
    let customer;
    let vendor;

    if (type === 'sale') {
        order = await SaleOrder.findById(referenceId);
        onModel = 'SaleOrder';
        amount = order.totalPrice;
        customer = order.customer;
    } else if (type === 'purchase') {
        order = await PurchaseOrder.findById(referenceId);
        onModel = 'PurchaseOrder';
        amount = order.totalCost;
        vendor = order.vendor;
    } else {
        res.status(400);
        throw new Error('Invalid invoice type');
    }

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    const invoice = await Invoice.create({
        type,
        reference: referenceId,
        onModel,
        customer,
        vendor,
        amount,
        dueDate,
        status: 'issued',
    });

    res.status(201).json(invoice);
});

// @desc    Get all invoices
// @route   GET /api/accounting/invoices
// @access  Private
const getInvoices = asyncHandler(async (req, res) => {
    const invoices = await Invoice.find({})
        .populate('customer', 'name')
        .populate('vendor', 'name');
    res.json(invoices);
});

// @desc    Get single invoice
// @route   GET /api/accounting/invoices/:id
// @access  Private
const getInvoiceById = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)
        .populate('customer', 'name email address')
        .populate('vendor', 'name email address')
        .populate('reference');

    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404);
        throw new Error('Invoice not found');
    }
});

// @desc    Update payment (simulate payment)
// @route   PUT /api/accounting/invoices/:id/pay
// @access  Private
const payInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
        invoice.status = 'paid';
        invoice.paidAmount = invoice.amount;

        const updatedInvoice = await invoice.save();

        // Update linked order status if needed
        if (invoice.type === 'sale') {
            const order = await SaleOrder.findById(invoice.reference);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                await order.save();
            }
        }

        res.json(updatedInvoice);
    } else {
        res.status(404);
        throw new Error('Invoice not found');
    }
});

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    payInvoice,
};
