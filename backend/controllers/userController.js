import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

// @desc    Register new user
// @route   Post /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Information Entered')
    }
})

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @desc    Update user profile
// @route   Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.firstName = req.body.firstName || user.firstName
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @desc    Get all users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await user.remove()
        res.json({ message: 'User Removed' })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @desc    Get User By ID
// @route   Delete /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @desc    Update user
// @route   Put /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

export { 
    authUser, 
    registerUser,
    getUserProfile,
    updateUserProfile, 
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}