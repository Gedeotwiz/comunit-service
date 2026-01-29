/** @format */

import { DecodToken } from '../utils/jwtUtils.js';
import User from '../model/userModel.js';

export function VerifyAccess(passRoles) {
  return async (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token) {
      return res.status(404).json({ message: 'No token provided' });
    } else {
      try {
        const decodedToken = DecodToken(token);
        const user = await User.findById(decodedToken?.id);
        if (!user) {
          return res
            .status(401)
            .json({ status: 401, message: 'Unauthenticated' });
        }
        if (!passRoles.includes(user.role)) {
          return res.status(401).json({ status: 403, message: 'Unauthorized' });
        }

        req.user = user;
        return next();
      } catch (error) {
        if ((error.name = 'JsonWebTokenError')) {
          return res
            .status(401)
            .json({ message: 'Invalid token or expired token' });
        } else {
          return res.status(500).json({ message: `error is ${error}` });
        }
      }
    }
  };
}
