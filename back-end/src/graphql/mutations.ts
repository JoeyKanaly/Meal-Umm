import { MercuriusContext } from 'mercurius';
import { v4 as uuid } from 'uuid';
import { query } from '../db';

export async function addFoodMutation(
	obj: any,
	args: any,
	context: MercuriusContext
) {
	try {
		const { name } = args.food as { name: string };
		const id = uuid();
		const res = await query(
			`INSERT INTO "api"."food" (id, name) VALUES ($1, $2)`,
			[id, name]
		);
		if (res.rowCount) {
			return {
				id,
				name,
			};
		}
		return {};
	} catch (error) {
		console.error(error);
		return {};
	}
}
