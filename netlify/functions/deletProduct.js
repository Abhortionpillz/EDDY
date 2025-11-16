// netlify/functions/deleteProduct.js
const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  
  try {
    const { refId } = JSON.parse(event.body);
    
    if (!refId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing product ID" }) };
    }

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });

    await client.query(
      q.Delete(q.Ref(q.Collection('products'), refId))
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Product ${refId} deleted` }),
    };

  } catch (error) {
    console.error("FaunaDB Delete Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};