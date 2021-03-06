const bcrypt = require('bcryptjs');

const data = {
    users:[
        {
            name: "Andres",
            email: "admin@admin.com",
            password: bcrypt.hashSync('12345', 8),
            isAdmin: true
        },
        {
            name: "Basir",
            email: "correo@example.com",
            password: bcrypt.hashSync('12345', 8),
            isAdmin: false
        }
    ],
    products:[
        {
            brand: 'Nike',
            name: 'Slim Shart',
            category: 'Shirts',
            image: '/images/d1.jpg',
            price: 120,
            countInStock: 7,
            rating: 3.5,
            numReviews: 20,
            description: 'high quality product'
        },
        {
            brand: 'Adidas',
            name: 'Slim Short',
            category: 'Shirts',
            image: '/images/d2.jpg',
            price: 10,
            countInStock: 0,
            rating: 3,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            brand: 'Lacoste',
            name: 'Slim Shirt',
            category: 'Shirts',
            image: '/images/d3.jpg',
            price: 20,
            countInStock: 20,
            rating: 5,
            numReviews: 5,
            description: 'high quality product'
        },
        {
            brand: 'Gucci',
            name: 'Slim Shurt',
            category: 'Shirts',
            image: '/images/d4.jpg',
            price: 12000,
            countInStock: 30,
            rating: 3,
            numReviews: 2,
            description: 'high quality product'
        },
        {
            brand: 'Nike',
            name: 'Slim Shert',
            category: 'Shirts',
            image: '/images/d5.jpg',
            price: 120,
            countInStock: 30,
            rating: 1,
            numReviews: 90,
            description: 'high quality product'
        },
        {
            brand: 'Nike',
            name: 'Slim Shiirt',
            category: 'Shirts',
            image: '/images/d6.jpg',
            price: 120,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        },
    ]
};

module.exports = data;