import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const healthRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/health",
    {
      schema: {
        summary: "Check if the server is up",
        tags: ["health"],
      },
    },
    async () => {
      return { status: "ok" };
    }
  );
};
