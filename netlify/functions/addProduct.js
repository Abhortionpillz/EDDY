// netlify/functions/addProduct.js
const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const productData = JSON.parse(event.body);
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET 
    });

    await client.query(
      q.Create(
        q.Collection('products'),
        { data: productData }
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product added successfully" }),
    };

  } catch (error) {
    console.error("FaunaDB Add Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};