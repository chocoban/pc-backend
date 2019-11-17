import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth';

import resolvers from '../resolvers';

dotenv.config();

const { OAuth2Strategy } = GoogleStrategy;

const { userResolver } = resolvers;

const clientId = process.env.GMAIL_CLIENT_ID;
const secretKey = process.env.GMAIL_CLIENT_SECRET;
const redirectUrl = 'http://localhost:8080/google/redirect';

export const userSerializer = (user, done) => {
  done(null, user);
};

export const strategy = new OAuth2Strategy({
  clientID: clientId,
  clientSecret: secretKey,
  callbackURL: redirectUrl
},
async (token, refreshToken, profile, done) => {
  try {
    const googleUserData = {
      name: profile.displayName,
      email: profile.emails[0].value,
      emailVerified: profile.emails[0].verified
    };
    const user = await userResolver.postUser(googleUserData);
    done(null, user);
  } catch (err) { return done(err, false, err.message); }
});
