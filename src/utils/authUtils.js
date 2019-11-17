import jsonwebtoken from 'jsonwebtoken';

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/google');
};

export const generateToken = (user) => {
  const token = jsonwebtoken.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1y' }
  );
  return token;
};

export const verifyToken = async (req) => {
  const [, token] = req.headers.authorization.split(' ');
  try {
    const decodedToken = await jsonwebtoken.verify(token, process.env.JWT_KEY);
    return decodedToken;
  } catch (err) { return err; }
};

export default { checkAuthentication };
