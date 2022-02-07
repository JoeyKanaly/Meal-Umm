import { MercuriusContext } from 'mercurius';
import { query } from '../db';

export async function foodsQuery() {
	try {
		const res = await query('SELECT * FROM "api"."food"');
		return res.rows;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function foodQuery(
	obj: any,
	args: any,
	context: MercuriusContext
) {
	try {
		const { name } = args as { name: string };
		const res = await query(
			'SELECT * FROM "api"."food" WHERE "name"=$1 LIMIT 1',
			[name]
		);
		console.log(res.rowCount);
		if (res.rowCount) return res.rows[0];
	} catch (error) {
		console.error(error);
		return {};
	}
}
