import axios from 'axios';
import {Endpoint} from '../../../types/types'

export default async function storeUserEndpoint(emailaddress: string|null|undefined, newEndpoint: Endpoint) {
    try {
        const response = await axios.post(`api/controllers/userEndpoints?emailaddress=${emailaddress}`, {
          newEndpoint,
        });
    } catch (error) {
      console.log(error);
    }
}