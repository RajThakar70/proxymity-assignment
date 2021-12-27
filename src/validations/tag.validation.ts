export const CreateTagRequest = {
  type: 'object',
  description: 'Create tag request body schema, only instructor can access',
  required: ["name"],
  properties: {
    name: {
      type: 'string',
      description: 'tag name',
    },
    description: {
      type: 'string',
      description: 'tag description',
    }
  },
};

export const UpdateTagRequest = {
  type: 'object',
  description: 'Update tag request body schema, only instructor can access',
  properties: {
    name: {
      type: 'string',
      description: 'tag name',
    },
    description: {
      type: 'string',
      description: 'tag description',
    }
  },
};

export const UpdateTagRequestParams = {
  tagId: {
    type: "string",
    description: "tag id to update specific tag"
  }
};

export const GetTagRequestParams = {
  tagId: {
    type: "string",
    description: "tag id to get specific tag"
  }
};

export const DeleteTagRequestParams = {
  tagId: {
    type: "string",
    description: "tag id to delete specific tag"
  }
};