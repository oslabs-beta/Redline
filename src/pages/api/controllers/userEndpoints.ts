const db = require('../database/userModel.ts');
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { emailaddress } = req.query;
  const getUserQuery = `SELECT * FROM users WHERE emailaddress = '${emailaddress}'`;
  const { rows } = await db.query(getUserQuery);
  const user = rows[0];
  const user_id = user.id;
  // grab the user id

  try {
    // grab the user endpoints in the table
    if (req.method == 'GET') {
      const getEndpointsQuery= `SELECT * FROM endpoints WHERE user_id = '${user_id}'`;
      const response  = await db.query(getEndpointsQuery);
      const endpoints = response.rows;
      return res.status(200).json(endpoints);
    }

    // add an endpoint into the endpoint table, assigning the userId.
    if (req.method === 'POST') {
      const { host, port, password, nickname } = req.body.newEndpoint;
      const params = [host, port, password, nickname, user_id];
      const saveEndpointQuery = `
            INSERT INTO endpoints (host, port, password, nickname, user_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `;
      const response = await db.query(saveEndpointQuery, params);
      console.log('endpoint successfully saved');
      return res.status(201).json(response.rows[0]);
    }
    
    // delete an endpoint from the endpoint table
    if (req.method === 'DELETE') {
      const { nickname } = req.body;
      const params = [nickname, user_id];
      const deleteEndpointQuery = `
            DELETE FROM endpoints WHERE nickname = '${nickname}' AND user_id = ${user_id}
            RETURNING *
            `;
      const response = await db.query(deleteEndpointQuery);
      console.log('endpoint successfully deleted');
      return res.status(201).json(response.rows[0]);
    }
    // console.log('in api call', newMetric);
  } catch (error) {
    return {
      log: `Error occured in getUserEndpoints middleware, ${error}`,
      status: 500,
      message: {error: 'Unable to handle request retrieve, create or delete endpoint.'}
    };
  }
}
