const fetch = require("node-fetch");
const product = require("./products.js");

var mutation = `mutation CreateProduct(
  $name: String!
  $type: String!
  $price: Int!
  $purchased: Int!
  $origin: String!
  $img: String! 
  $description: String!
) {
  createProduct(
      name: $name
      type: $type
      price: $price
      purchased: $purchased
      origin: $origin
      img: $img
      description: $description
  ) {
    id
    name
  }
}`;

product.forEach(element => {
  fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: mutation,
      variables: element
    })
  })
    .then(r => r.json())
    .then(data => console.log("data returned:", data));
});
