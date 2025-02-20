import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getTopRanking } from "../functions/get-top-ranking";

export const getTopRankingRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		"/ranking",
		{
			schema: {
				summary: "Get subscriber ranking position",
				tags: ["referral"],
				response: {
					200: z.object({
						ranking: z.array(
							z.object({
								id: z.string(),
								name: z.string(),
								score: z.number(),
							})
						),
					}),
				},
			},
		},
		async (req, rep) => {
			const { ranking } = await getTopRanking();

			return {
				ranking,
			};
		}
	);
};
