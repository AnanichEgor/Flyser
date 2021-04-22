const server = 'http://3.125.115.205:8082';

export const urls = {
  login: `${server}/api/v1/login`,
  registration: `${server}/api/v1/doctors/registration`,
  registrationClient: `${server}/api/v1/doctors/registration/client`,
  refreshToken: `${server}/api/v1/login/update-token`,
  clients: `${server}/api/v1/doctors/clients`,
  clientInfo: `/api/v1/doctors/clients/{0}/info`
};

export const cookieName = 'flyser-cookie';
export const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
