import { defaultUser } from './__mocks__/authMock';
import { generateToken } from '../src/utils/authUtils';


describe('test auth', () => {
  it('test that token is return', () => {
    const token = generateToken(defaultUser);
    expect(token).not.toBeNull();
  });
});
