export const CreateCourseRequest = {
  type: 'object',
  description: 'Create course request body schema, only instructor can access',
  required: ["name", "subjectIds", "isActive"],
  properties: {
    name: {
      type: 'string',
      description: 'course name',
    },
    description: {
      type: 'string',
      description: 'course description',
    },
    subjectIds: {
      type: 'array',
      description: 'subject ids where course belongs',
      items: {
        type: 'string',
        description: "subject id in string",
        uniqueItems: true
      }
    },
    isActive: {
      type: 'boolean',
      description: 'course active status',
    },
  },
};

export const UpdateCourseRequest = {
  type: 'object',
  description: 'Update course request body schema, only instructor can access',
  properties: {
    name: {
      type: 'string',
      description: 'course name',
    },
    description: {
      type: 'string',
      description: 'course description',
    },
    subjectIds: {
      type: 'array',
      description: 'subject ids where course belongs',
      items: {
        type: 'string',
        description: "subject id in string",
        uniqueItems: true
      }
    },
    isActive: {
      type: 'boolean',
      description: 'course active status',
    },
  },
};

export const UpdateCourseRequestParams = {
  courseId: {
    type: "string",
    description: "course id to update specific course"
  }
};

export const GetCourseRequestParams = {
  courseId: {
    type: "string",
    description: "course id to get specific course"
  }
};

export const DeleteCourseRequestParams = {
  courseId: {
    type: "string",
    description: "course id to delete specific course"
  }
};

export const SubscribeToCourseParams = {
  courseId: {
    type: "string",
    description: "course id to subscribe"
  }
};

export const UnsubscribeToCourseParams = {
  courseId: {
    type: "string",
    description: "course id to unsubscribe"
  }
};


export const GetActiveCourseQuery = {
  type: 'object',
  properties: {
    courseId: {
      type: 'string',
      description: 'course ids',
    }
  },
};