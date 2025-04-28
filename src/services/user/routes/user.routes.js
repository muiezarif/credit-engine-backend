const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Create a new user
router.post('/', userController.createUser.bind(userController));

// Get all users
router.get('/', userController.getAllUsers.bind(userController));

// Get user by ID
router.get('/id/:id', userController.getUserById.bind(userController));

// Get user by National ID
router.get('/national-id/:nationalId', userController.getUserByNationalId.bind(userController));

// Update user
router.put('/:id', userController.updateUser.bind(userController));

// Delete user
router.delete('/:id', userController.deleteUser.bind(userController));

module.exports = router;