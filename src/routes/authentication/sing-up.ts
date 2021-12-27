import { FastifyRequest, FastifyReply } from 'fastify';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import FastifyApp from '../../infrastructure/providers/FastifyApp';
import Locals from '../../infrastructure/providers/Locals';
import { errorBuilder, responseBuilder } from '../../utils/builders';

export class SignUpUser {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { email, password, name, isInstructor } = req.body;

      const foundUser = await User.find({ email });

      if (foundUser.length) {
        rep.code(422);
        return errorBuilder("Can't use this email id!");
      }

      const maxSaltRounds = Math.floor(
        Math.random() * Locals.config().bcryptSaltRoundMax
      );

      let passwordHash = password;

      try {
        passwordHash = await bcrypt.hash(password, maxSaltRounds);
      } catch (error) {
        throw error;
      }

      const userDB = new User({
        name,
        email,
        password: passwordHash,
        isInstructor,
      });

      await userDB.save();

      const JWT = FastifyApp.fastifyServer.jwt;
      const tokenIssueTime = Date.now();
      const tokenExpireTime = tokenIssueTime + Locals.config().tokenExpireTime;

      const token = JWT.sign({
        userId: userDB._id,
        exp: tokenExpireTime,
        iat: tokenIssueTime,
        isInstructor: userDB.isInstructor,
        name: userDB.name,
      });

      rep.code(201);
      return responseBuilder({ token, permission: userDB.isInstructor });
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
