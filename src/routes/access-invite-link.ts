import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/access-invite-link";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		"/invites/:subscriberId",
		{
			schema: {
				params: z.object({
					subscriberId: z.string(),
				}),
				summary: "Access invite link and redirects user",
				tags: ["referral"],
				response: {
					302: z.null(),
				},
			},
		},
		async (req, rep) => {
			const { subscriberId } = req.params;
			await accessInviteLink({ subscriberId });

			const redirectUrl = new URL(env.WEB_URL);
			redirectUrl.searchParams.set("referrer", subscriberId);
			return rep.redirect(redirectUrl.toString(), 302);
		}
	);
};
