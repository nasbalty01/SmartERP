const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['sale', 'purchase'],
            required: true,
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'onModel',
            required: true,
        },
        onModel: {
            type: String,
            required: true,
            enum: ['SaleOrder', 'PurchaseOrder'],
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['draft', 'issued', 'paid', 'cancelled'],
            default: 'draft',
        },
        dueDate: {
            type: Date,
            required: true,
        },
        issuedDate: {
            type: Date,
            default: Date.now,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
