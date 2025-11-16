// netlify/functions/getProducts.js
const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET 
    });

    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_products'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );

    // FaunaDB returns data in a { ref, ts, data } format
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };

  } catch (error) {
    console.error("FaunaDB Get Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};