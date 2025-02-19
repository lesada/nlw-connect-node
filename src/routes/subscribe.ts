import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

export const subscribeRoute: FastifyPluginAsyncZod = async app => {
	app.post(
		"/subscriptions",
		{
			schema: {
				body: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				summary: "Subscribe someone to the event",
				tags: ["subscription"],
				response: {
					201: z.object({
						name: z.string(),
						email: z.string().email(),
					}),
				},
			},
		},
		async (req, rep) => {
			const { name, email } = req.body
			rep.status(201).send({ name, email })
		}
	)
}
