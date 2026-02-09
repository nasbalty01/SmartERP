const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getOrders,
} = require('../controllers/salesController');
const { protect } = require('../middleware/authMiddleware');

router.route('/orders').post(protect, addOrderItems).get(protect, getOrders);
router.route('/orders/:id').get(protect, getOrderById);
router.route('/orders/:id/status').put(protect, updateOrderStatus);

module.exports = router;
