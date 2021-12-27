import { FastifyRequest, FastifyReply } from 'fastify';
import User from '../../models/user.model';
import { errorBuilder, responseBuilder } from '../../utils/builders';
import bcrypt from 'bcrypt';
import Locals from '../../infrastructure/providers/Locals';

export class CreateUser {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const {
        name,
        email,
        password,
        isInstructor
      } = req.body;

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

      rep.code(201);
      return responseBuilder(userDB._id);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class UpdateUser {
  public static async perform(
    req: FastifyRequest<{ Params: { userId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, email, password, isInstructor } = req.body;
      const { userId } = req.params;

      const foundUser = await User.findOne({ _id: userId });

      if (name) {
        foundUser.name = name;
      }

      if (email) {
        foundUser.email = email;
      }

      if (password) {
        const maxSaltRounds = Math.floor(
          Math.random() * Locals.config().bcryptSaltRoundMax
        );

        let passwordHash = password;

        try {
          passwordHash = await bcrypt.hash(password, maxSaltRounds);
        } catch (error) {
          throw error;
        }

        foundUser.password = passwordHash;
      }

      if (typeof isInstructor === 'boolean') {
        foundUser.isInstructor = isInstructor;
      }

      await foundUser.save();
      rep.code(201);
      return responseBuilder('updated');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetUser {
  public static async perform(
    req: FastifyRequest<{ Params: { userId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const userList = await User.find({});
      rep.code(200);
      return responseBuilder(userList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class DeleteUser {
  public static async perform(
    req: FastifyRequest<{ Params: { userId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { userId } = req.params;

      const user = await User.find({
				_id: userId,
			});

      if(!user) {
        rep.code(422);
				return errorBuilder("User not found");
      }

			const removedUserResult = await User.remove({ _id: userId });

			if (!removedUserResult.deletedCount) {
				rep.code(404);
				return errorBuilder("Not Found!");
			}

			rep.code(200);
			return responseBuilder("Deleted");
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
