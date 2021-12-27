export const SignInRequest = {
  type: 'object',
  description: 'Sign in user request schema',
  required: ["email", "password"],
  properties: {
    email: {
      type: 'string',
      description: 'user email',
    },
    password: {
      type: 'string',
      description: 'user password',
    }
  },
};

export const SignUpRequest = {
  type: 'object',
  description: 'Sign up user request schema',
  required: ["email", "password", "name", "isInstructor"],
  properties: {
    email: {
      type: 'string',
      description: 'user email',
    },
    password: {
      type: 'string',
      description: 'user password',
    },
    name: {
      type: 'string',
      description: 'user name',
    },
    isInstructor: {
      type: 'boolean',
      description: 'user is instructor or not',
    }
  },
};
