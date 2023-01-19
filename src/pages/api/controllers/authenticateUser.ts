// const db = require('../database/userModel.ts');
// const bcrypt = require('bcrypt');
// import type { NextApiRequest, NextApiResponse } from 'next';


// export default async function authenticateUser(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // destructure the request body
//     const { emailaddress, password } = req.body;

//     // select from users table where email address is email
//     const getUserQuery = `SELECT * FROM users WHERE emailaddress = '${emailaddress}'`;
//     const { rows } = await db.query(getUserQuery); 
//     const user = rows[0];
//     console.log(user); 
//     if (!user) return res.status(403).json({});
//     // compare the password receieved in the request body to the password in the database using bcrypt compare
//     // if they are a match
//     if (user && (await bcrypt.compare(password, user.password))) {
//         // return status code 200 with response
//         const {id, firstname, lastname } = user;
//         return res.status(200).json({id, firstname, lastname});
//     // if password is not the same, display error for incorrect username or password
//     } else {
//         return res.status(403).json({}); 
//     }
//   } catch(error) {
//     return {
//       log: `Error occurred in userController middleware ${error}`,
//       status: 500,
//       message: { error: 'Unable to create a new user account' },
//     };
//   }
// }

// module.exports = authenticateUser;

