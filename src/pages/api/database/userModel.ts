const { Pool } = require('pg');

const PG_URI = process.env.REDLINE_PUBLIC_DB_URI

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text:string, params:string, callback:()=>void) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

export { pool }; 