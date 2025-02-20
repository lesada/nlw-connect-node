import { redis } from "../redis/client";

type getSubscriberInviteClicksParams = {
	subscriberId: string;
};

export async function getSubscriberInviteClicks({
	subscriberId,
}: getSubscriberInviteClicksParams) {
	const clicks = await redis.hget("referral:access-clicks", subscriberId);
	return {
		clicks: clicks ? Number.parseInt(clicks) : 0,
	};
}
