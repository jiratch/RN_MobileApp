// functions/index.js
const functions = require('firebase-functions');
const faker = require('faker');
 
// Initialize products array
const products = [];
 
// Max number of products
const LIMIT = 100;
 
// Push a new product to the array
for (let i = 0; i < LIMIT; i++) {
  products.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}
 
exports.products = functions.https.onRequest((request, response) => {
  const { page = 1, limit = 10 } = request.query;
 
  const startAt = (page - 1) * limit;
  const endAt = startAt + limit;
 
  return response.json(products.slice(startAt, endAt));
});


// exports.products = functions.https.onCall((input, context) => {
//   const { page = 1, limit = 10 } = input;
 
//   const startAt = (page - 1) * limit;
//   const endAt = startAt + limit;
 
//   return products.slice(startAt, endAt);
// });
