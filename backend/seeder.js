const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Category = require('./models/categoryModel');
const Product = require('./models/productModel');
const Lead = require('./models/leadModel');
const Customer = require('./models/customerModel');
const Employee = require('./models/employeeModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();
        await Lead.deleteMany();
        await Customer.deleteMany();
        await Employee.deleteMany();

        // Create Users
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin',
            status: 'active',
        });

        const employeeUser = await User.create({
            name: 'John Employee',
            email: 'employee@example.com',
            password: 'password123',
            role: 'employee',
            status: 'active',
        });

        const janeUser = await User.create({
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'password123',
            role: 'manager',
            status: 'active',
        });

        // Create Employees
        await Employee.create([
            {
                user: employeeUser._id,
                department: 'Sales',
                position: 'Sales Representative',
                salary: 50000,
                joinDate: new Date('2023-01-15'),
                avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
                phone: '123-456-7890'
            },
            {
                user: janeUser._id,
                department: 'Marketing',
                position: 'Marketing Manager',
                salary: 75000,
                joinDate: new Date('2022-05-20'),
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                phone: '987-654-3210'
            }
        ]);


        // Create Categories
        const electronics = await Category.create({ name: 'Electronics', description: 'Gadgets and devices' });
        const furniture = await Category.create({ name: 'Furniture', description: 'Office and home furniture' });
        const clothing = await Category.create({ name: 'Clothing', description: 'Apparel and accessories' });

        // Create Products
        await Product.create([
            {
                name: 'iPhone 15 Pro',
                sku: 'IP15P-BLK',
                description: 'Latest Apple iPhone',
                price: 999,
                cost: 800,
                quantity: 50,
                category: electronics._id,
                image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=200&auto=format&fit=crop'
            },
            {
                name: 'Dell XPS 15',
                sku: 'DELL-XPS15',
                description: 'High performance laptop',
                price: 1899,
                cost: 1500,
                quantity: 20,
                category: electronics._id,
                image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=200&auto=format&fit=crop'
            },
            {
                name: 'Ergonomic Chair',
                sku: 'ERGO-CHAIR-01',
                description: 'Comfortable office chair',
                price: 299,
                cost: 150,
                quantity: 100,
                category: furniture._id,
                image: 'https://images.unsplash.com/photo-1505843478700-caed6d3d0794?q=80&w=200&auto=format&fit=crop'
            },
            {
                name: 'Leather Jacket',
                sku: 'LTHR-JKT-001',
                description: 'Genuine leather jacket',
                price: 199,
                cost: 80,
                quantity: 30,
                category: clothing._id,
                image: 'https://images.unsplash.com/photo-1551028919-ac66c5f8b6b9?q=80&w=200&auto=format&fit=crop'
            }
        ]);

        // Create Leads
        await Lead.create([
            {
                name: 'Alice Johnson',
                email: 'alice@test.com',
                phone: '123-456-7890',
                source: 'website',
                status: 'new',
                notes: 'Interested in bulk laptop purchase',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
            },
            {
                name: 'Bob Smith',
                email: 'bob@test.com',
                phone: '987-654-3210',
                source: 'referral',
                status: 'contacted',
                notes: 'Needs office furniture',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
            },
            {
                name: 'Charlie Brown',
                email: 'charlie@test.com',
                phone: '555-555-5555',
                source: 'social_media',
                status: 'qualified',
                notes: 'Looking for distributor partnership',
                avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop'
            },
        ]);

        // Create Customers
        await Customer.create([
            {
                name: 'Acme Corp',
                email: 'contact@acme.com',
                phone: '555-0123',
                address: '123 Business Rd',
                city: 'New York',
                country: 'USA',
                company: 'Acme Corp',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
                createdBy: adminUser._id,
            },
            {
                name: 'Globex Inc',
                email: 'info@globex.com',
                phone: '555-9876',
                address: '456 Indus St',
                city: 'San Francisco',
                country: 'USA',
                company: 'Globex Inc',
                logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop',
                createdBy: adminUser._id,
            }
        ]);

        console.log('Data Imported Successfully with Images!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
