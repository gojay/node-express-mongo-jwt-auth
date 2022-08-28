const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node.js Express Mongodb Typescript",
    version: "0.0.1",
    description:
      "This is a node express mongoose crud with JWT authentication in typescript",
    license: {
      name: "MIT",
      url: "https://github.com/saisilinus/node-express-mongoose-typescript-boilerplate.git",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.APP_PORT}/v1`,
      description: "Development Server",
    },
  ],
};

export default swaggerDefinition;
