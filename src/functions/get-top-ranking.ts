import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

export async function getTopRanking() {
	const redisRanking = await redis.zrevrange(
		"referral:ranking",
		0,
		2,
		"WITHSCORES"
	);

	const subscriberIdAndScore: Record<string, number> = {};

	for (let i = 0; i < redisRanking.length; i += 2) {
		const subscriberId = redisRanking[i];
		const score = Number(redisRanking[i + 1]);

		subscriberIdAndScore[subscriberId] = score;
	}

	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)));

	const ranking = subscribers
		.map(subscriber => ({
			id: subscriber.id,
			name: subscriber.name,
			score: subscriberIdAndScore[subscriber.id],
		}))
		.sort((a, b) => b.score - a.score);

	return {
		ranking,
	};
}
