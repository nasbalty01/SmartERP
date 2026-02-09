const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Lead = require('../models/leadModel');
const Customer = require('../models/customerModel');
const Employee = require('../models/employeeModel');
const SaleOrder = require('../models/salesModel');
const PurchaseOrder = require('../models/purchaseOrderModel');
const Invoice = require('../models/invoiceModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
    const [
        productCount,
        leadCount,
        customerCount,
        employeeCount,
        saleCount,
        purchaseCount,
        invoiceCount,
        totalSales
    ] = await Promise.all([
        Product.countDocuments(),
        Lead.countDocuments(),
        Customer.countDocuments(),
        Employee.countDocuments(),
        SaleOrder.countDocuments(),
        PurchaseOrder.countDocuments(),
        Invoice.countDocuments(),
        SaleOrder.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ])
    ]);

    // Monthly sales data for charts
    const monthlySales = await SaleOrder.aggregate([
        { $match: { status: 'completed' } },
        {
            $group: {
                _id: { $month: '$createdAt' },
                amount: { $sum: '$totalAmount' }
            }
        },
        { $sort: { '_id': 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = monthlySales.map(item => ({
        name: monthNames[item._id - 1],
        amount: item.amount
    }));

    res.json({
        stats: {
            products: productCount,
            leads: leadCount,
            customers: customerCount,
            employees: employeeCount,
            salesCount: saleCount,
            purchasesCount: purchaseCount,
            invoicesCount: invoiceCount,
            totalSales: totalSales[0]?.total || 0,
        },
        chartData
    });
});

module.exports = {
    getDashboardStats
};
