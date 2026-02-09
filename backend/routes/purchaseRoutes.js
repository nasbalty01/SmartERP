const express = require('express');
const router = express.Router();
const {
    getVendors,
    createVendor,
    createPurchaseOrder,
    getPurchaseOrders,
    updatePurchaseOrderStatus,
} = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/vendors').get(protect, getVendors).post(protect, createVendor);
router.route('/orders').get(protect, getPurchaseOrders).post(protect, createPurchaseOrder);
router.route('/orders/:id/status').put(protect, updatePurchaseOrderStatus);

module.exports = router;
