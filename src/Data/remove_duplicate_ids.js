const fs = require('fs');

// Read the products JSON file
const productsData = require('./krusty_products.json');

// Initialize an empty object to store categories and subcategories
const productIds = [];

// Iterate through each product
productsData.forEach((product) => {
    // If productIds does not contain the product id, add it to the array.
    if (!productIds.includes(product.id)) {
        productIds.push(product.id);
    }
    // If productIds does contain the product id, remove the product from the array.
    else {
        productsData.splice(productsData.indexOf(product), 1);
        console.log('product removed');
    }
});

// Write the products to a new JSON file
fs.writeFileSync('new_krusty_products.json', JSON.stringify(productsData, null, 2));

console.log('Categories and subcategories JSON file created.');
