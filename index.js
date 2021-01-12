const express = require('express');
const app = express();
const db = require('./db');
// const s3 = require('./s3');
// const { s3Url } = require('./config.json');

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

// products
app.get('/products', (req, res) => {
    console.log('GET request to /products');
    db.getAllProducts()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('error in db.getAllProducts: ', err);
        });
});

// featured products
app.get('/featured', (req, res) => {
    console.log('GET request to /featured');
    db.getFeatured()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('error in db.getImages: ', err);
        });
});

// Get product
app.get('/product/:productId', (req, res) => {
    console.log('GET request to /product/:productId');
    db.getProduct(req.query.productId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('error in db.getProduct: ', err);
        });
});

// search
app.get('/search', (req, res) => {
    console.log('GET request to /search');
    db.searchProducts(req.query.searchInput)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('error in db.searchProducts: ', err);
        });
});

// brands
app.get('/brands', (req, res) => {
    console.log('GET request to /brands');
    db.getProductsByBrand(req.query.brand)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('error in db.getProductsByBrand: ', err);
        });
});

// price
app.get('/price', (req, res) => {
    console.log('GET request to /price');
    db.getProductsByPrice(req.query.price)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('error in db.getProductsByBrand: ', err);
        });
});

app.use(express.static('public'));

if (require.main == module) {
    app.listen(process.env.PORT || 8080, () => {
        console.log('webshop up and running');
    });
}
