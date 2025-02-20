import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberInviteCount } from "../functions/get-subscriber-invite-count";

export const getSubscriberInviteCountRoute: FastifyPluginAsyncZod =
	async app => {
		app.get(
			"/subscribers/:subscriberId/ranking/count",
			{
				schema: {
					params: z.object({
						subscriberId: z.string(),
					}),
					summary: "Get subscriber invite count",
					tags: ["referral"],
					response: {
						200: z.object({
							count: z.number(),
						}),
					},
				},
			},
			async (req, rep) => {
				const { subscriberId } = req.params;
				const { count } = await getSubscriberInviteCount({ subscriberId });

				return {
					count,
				};
			}
		);
	};
