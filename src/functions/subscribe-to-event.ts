import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

type subscribeToEventParams = {
	name: string;
	email: string;
};

export async function subscribeToEvent({
	name,
	email,
}: subscribeToEventParams) {
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email))
		.limit(1);

	if (subscribers.length > 0) {
		const subscriber = subscribers[0];
		return {
			subscriberId: subscriber.id,
		};
	}

	const result = await db
		.insert(subscriptions)
		.values({
			name,
			email,
		})
		.returning();

	const subscriber = result[0];
	return {
		subscriberId: subscriber.id,
	};
}
