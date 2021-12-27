export const CreateLessonRequest = {
  type: 'object',
  description: 'Create lesson request body schema, only instructor can access',
  required: ["name", "courseIds", "isActive"],
  properties: {
    name: {
      type: 'string',
      description: 'lesson name',
    },
    description: {
      type: 'string',
      description: 'lesson description',
    },
    courseIds: {
      type: 'array',
      description: 'course ids where lesson belongs',
      items: {
        type: 'string',
        description: "course id in string",
        uniqueItems: true
      }
    },
    isActive: {
      type: 'boolean',
      description: 'lesson active status',
    },
  },
};

export const UpdateLessonRequest = {
  type: 'object',
  description: 'Update lesson request body schema, only instructor can access',
  properties: {
    name: {
      type: 'string',
      description: 'lesson name',
    },
    description: {
      type: 'string',
      description: 'lesson description',
    },
    courseIds: {
      type: 'array',
      description: 'course ids where lesson belongs',
      items: {
        type: 'string',
        description: "course id in string",
        uniqueItems: true
      }
    },
    isActive: {
      type: 'boolean',
      description: 'lesson active status',
    },
  },
};

export const UpdateLessonRequestParams = {
  lessonId: {
    type: "string",
    description: "lesson id to update specific lesson"
  }
};

export const GetLessonRequestParams = {
  lessonId: {
    type: "string",
    description: "lesson id to get specific lesson"
  }
};

export const DeleteLessonRequestParams = {
  lessonId: {
    type: "string",
    description: "lesson id to delete specific lesson"
  }
};

export const GetActiveLessonsQuery = {
  type: 'object',
  properties: {
    courseId: {
      type: 'string',
      description: 'course ids',
    }
  },
};
