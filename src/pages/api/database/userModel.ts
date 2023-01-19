const { Pool } = require('pg');

const PG_URI =
  'postgres://efsshisr:WZTM1J1x0aLfCwfUsSSA_HPubqLp9nUZ@ziggy.db.elephantsql.com/efsshisr';

// create a new pool using the connection string
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