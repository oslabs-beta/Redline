const db = require('../database/userModel.ts');
const bcrypt = require('bcrypt');
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function userController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // destructure the request body
    const { firstname, lastname, emailaddress, password } = req.body;
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if the email address exists in the users table
    // query the db for finding the user from the db with the emailAddress
    const getUserQuery = `SELECT * FROM users WHERE emailaddress = '${emailaddress}'`;
    const { rows } = await db.query(getUserQuery);
    const user = rows[0];
    // if the user doesn't exist, insert the user into the sql table
    if (!user) {
      const params = [firstname, lastname, emailaddress, hashedPassword];
      const createUserQuery = `
            INSERT INTO users (firstname, lastname, emailaddress, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `;
      const response = await db.query(createUserQuery, params);
      return res.status(201).json(response.rows[0]);
    } else {
      console.log('user exists in userhandling')
      return res.status(409).json({}); 
    }
  } catch(error) {
    return {
      log: `Error occurred in userController middleware ${error}`,
      status: 500,
      message: { error: 'Unable to create a new user account' },
    };
  }
}

// verify the user

// forget password functionality

// update user information

module.exports = userController;

/*
 switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("allPosts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
*/
