export const CreateSubjectRequest = {
  type: 'object',
  description: 'Create subject request body schema, only instructor can access',
  required: ["name"],
  properties: {
    name: {
      type: 'string',
      description: 'subject name',
    },
    description: {
      type: 'string',
      description: 'subject description',
    }
  },
};

export const UpdateSubjectRequest = {
  type: 'object',
  description: 'Update subject request body schema, only instructor can access',
  properties: {
    name: {
      type: 'string',
      description: 'subject name',
    },
    description: {
      type: 'string',
      description: 'subject description',
    }
  },
};

export const UpdateSubjectRequestParams = {
  subjectId: {
    type: "string",
    description: "subject id to update specific subject"
  }
};

export const GetSubjectRequestParams = {
  subjectId: {
    type: "string",
    description: "subject id to get specific subject"
  }
};

export const DeleteSubjectRequestParams = {
  subjectId: {
    type: "string",
    description: "subject id to delete specific subject"
  }
};