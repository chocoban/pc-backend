import models from '../../db/models';
import { generateToken } from '../../src/utils/authUtils';

export const mockGoogleProfile = {
  id: '112911690555059381222',
  displayName: 'user user',
  name: { familyName: 'user', givenName: 'user' },
  emails: [{ value: 'user@gmail.com', verified: true }],
  photos:
   [{
     value:
        'https://lh4.googleusercontent.com/-Ik7vagk_jGU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdMKKSt3bNG43jvsMiOK5xYjAibxA/photo.jpg'
   }],
  provider: 'google'
};
export const defaultUser = {
  id: '120',
  name: 'user',
  email: 'user@gmail.com'
};

export const token = generateToken(defaultUser);

export const usersMock = [
  {
    id: '120',
    name: 'user',
    email: 'user@gmail.com'
  },
  {
    id: '123',
    name: 'user3',
    email: 'user3@gmail.com'
  },
  {
    id: '124',
    name: 'user4',
    email: 'user4@gmail.com'
  },
  {
    id: '125',
    name: 'user5',
    email: 'user5@gmail.com'
  },
  {
    id: '126',
    name: 'user6',
    email: 'user6@gmail.com'
  }
];

export const setUpDB = async () => {
  await models.User.bulkCreate(usersMock);
};

export const cleanDB = async () => {
  await models.User.destroy({ force: true, truncate: { cascade: true } });
};
