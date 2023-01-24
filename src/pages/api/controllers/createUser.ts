const db = require('../database/userModel.ts');
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // check to see if the user exists in the database
    const {emailaddress} = req.body; 
    const getUserQuery = `SELECT * FROM users WHERE emailaddress = '${emailaddress}'`;
    const { rows } = await db.query(getUserQuery);
    const user = rows[0];
    
    // if they don't and they've logged in or created an account add them to the user table in sql
    if (!user) {
      const params = [emailaddress];
      const createUserQuery = `
            INSERT INTO users (emailaddress)
            VALUES ($1)
            RETURNING *
            `;
      const response = await db.query(createUserQuery, params);
      console.log('user successfully added')
      return res.status(201).json(response.rows[0]);
    } else {
      console.log('user already exists in database')
      return res.status(409).json({}); 
    }
  } catch(error) {
    return {
      log: `Error occurred in createUser middleware ${error}`,
      status: 500,
      message: { error: 'Unable to create a new user account' },
    };
  }
}

module.exports = createUser;