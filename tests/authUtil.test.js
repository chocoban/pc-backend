const { defaultUser } = require('./__mocks__/authMock');
const { generateToken } = require('../src/utils/authUtils');


test('test that token is return', () => {
  const token = generateToken(defaultUser);
  expect(token).not.toBeNull();
});
