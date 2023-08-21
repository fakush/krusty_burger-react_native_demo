const fs = require('fs');

// Read the products JSON file
const productsData = require('./krusty_products.json');

// Initialize an empty object to store categories and subcategories
const categoriesData = {};

// Iterate through each product
productsData.forEach((product) => {
  const { category, subcategory } = product;

  // Check if the category already exists in the categoriesData
  if (!categoriesData[category]) {
    categoriesData[category] = {subcategories: []};
  }

  // Check if the subcategory already exists in the category
  if (!categoriesData[category].subcategories[subcategory]) {
    // Add the subcategory to the subcategories array
    categoriesData[category].subcategories.push(subcategory);
  }
});

// Write the categoriesData to a new JSON file
fs.writeFileSync('krusty_categories.json', JSON.stringify(categoriesData, null, 2));

console.log('Categories and subcategories JSON file created.');
