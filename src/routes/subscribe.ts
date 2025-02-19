import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { subscribeToEvent } from "../functions/subscribe-to-event"

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
						subscriberId: z.string(),
					}),
				},
			},
		},
		async (req, rep) => {
			const { name, email } = req.body

			const { subscriberId } = await subscribeToEvent({ name, email })
			rep.status(201).send({ subscriberId })
		}
	)
}
