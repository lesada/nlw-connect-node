import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberRankingPosition } from "../functions/get-subscriber-ranking-position";

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
	async app => {
		app.get(
			"/subscribers/:subscriberId/ranking/position",
			{
				schema: {
					params: z.object({
						subscriberId: z.string(),
					}),
					summary: "Get subscriber ranking position",
					tags: ["referral"],
					response: {
						200: z.object({
							position: z.number().nullable(),
						}),
					},
				},
			},
			async (req, rep) => {
				const { subscriberId } = req.params;

				const { position } = await getSubscriberRankingPosition({
					subscriberId,
				});

				return {
					position,
				};
			}
		);
	};
