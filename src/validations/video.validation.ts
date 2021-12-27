export const CreateVideoRequest = {
  type: 'object',
  description: 'Create video request body schema, only instructor can access',
  required: ['name', 'lessonIds', 'tagIds', 'link'],
  properties: {
    name: {
      type: 'string',
      description: 'video name',
    },
    description: {
      type: 'string',
      description: 'video description',
    },
    lessonIds: {
      type: 'array',
      description: 'lesson ids where video belongs',
      items: {
        type: 'string',
        description: 'lesson id in string',
        uniqueItems: true,
      },
    },
    tagIds: {
      type: 'array',
      description: 'tag ids where video belongs',
      items: {
        type: 'string',
        description: 'tag id in string',
        uniqueItems: true,
      },
    },
    link: {
      type: 'string',
      description: 'video link',
    },
  },
};

export const UpdateVideoRequest = {
  type: 'object',
  description: 'Update video request body schema, only instructor can access',
  properties: {
    name: {
      type: 'string',
      description: 'video name',
    },
    description: {
      type: 'string',
      description: 'video description',
    },
    lessonIds: {
      type: 'array',
      description: 'lesson ids where video belongs',
      items: {
        type: 'string',
        description: 'lesson id in string',
        uniqueItems: true,
      },
    },
    tagIds: {
      type: 'array',
      description: 'tag ids where video belongs',
      items: {
        type: 'string',
        description: 'tag id in string',
        uniqueItems: true,
      },
    },
    link: {
      type: 'string',
      description: 'video link',
    },
  },
};

export const UpdateVideoRequestParams = {
  videoId: {
    type: 'string',
    description: 'video id to update specific video',
  },
};

export const GetVideoRequestParams = {
  videoId: {
    type: 'string',
    description: 'video id to get specific video',
  },
};

export const DeleteVideoRequestParams = {
  videoId: {
    type: 'string',
    description: 'video id to delete specific video',
  },
};

export const GetActiveVideosQuery = {
  type: 'object',
  properties: {
    lessonId: {
      type: 'string',
      description: 'lesson ids',
    },
    videoName: {
      type: 'string',
      description: 'video names',
    },
    tagNames: {
      type: 'string',
      description: '"," separated tag names without white space',
    },
  },
};
