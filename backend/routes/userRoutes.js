const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         role:
 *           type: string
 *           description: The user role (admin, manager, employee)
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         password: password123
 */

router.route('/').post(registerUser).get(protect, authorize('admin'), getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
