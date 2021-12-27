export const CreateUserRequest = {
  type: 'object',
  description: 'Create user request body schema',
  required: ['name', 'email', 'password', 'isInstructor'],
  properties: {
    name: {
      type: 'string',
      description: 'user name',
    },
    email: {
      type: 'string',
      description: 'user email',
    },
    password: {
      type: 'string',
      description: 'user password',
    },
    isInstructor: {
      type: 'boolean',
      description: 'user is instructor or not',
    },
  },
  examples: [
    {
      name: 'Student',
      value: {
        name: 'Test',
        email: 'test@abc.com',
        password: 'test',
        isInstructor: false,
      },
    },
    {
      name: 'Instructor',
      value: {
        name: 'Test',
        email: 'test@abc.com',
        password: 'test',
        isInstructor: true,
      },
    }
  ],
};
