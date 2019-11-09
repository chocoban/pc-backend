import { Router } from 'express';
import passport from 'passport';

import { userSerializer, strategy } from '../helpers/passport';


const router = Router();

const scope = ['https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/plus.me'
];

passport.use(strategy);
passport.serializeUser(userSerializer);
passport.deserializeUser(userSerializer);

router.get(
  '/google',
  passport.authenticate('google', {
    scope,
    successRedirect: '/google/redirect',
    failureRedirect: '/',
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/google',
    successRedirect: '/api'
  })
);

export default router;
