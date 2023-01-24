import axios from 'axios';

export default async function deleteUserEndpoint(emailaddress:string|null|undefined, endpoint: string) {

        try {
            const response = await axios.delete(`api/controllers/userEndpoints?emailaddress=${emailaddress}`, { data: {
              nickname: endpoint,
            }})
        } catch (err) {
          console.log(err);
        }
  }
