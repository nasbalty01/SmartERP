const mongoose = require('mongoose');

const purchaseOrderSchema = mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                unitCost: { type: Number, required: true },
            },
        ],
        totalCost: {
            type: Number,
            required: true,
            default: 0.0,
        },
        status: {
            type: String,
            enum: ['pending', 'received', 'cancelled'],
            default: 'pending',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isReceived: {
            type: Boolean,
            required: true,
            default: false,
        },
        receivedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
