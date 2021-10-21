import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string | undefined> {
	try {
		const { ARGON_MEMORY_COST, ARGON_PARALLELISM, ARGON_TIME_COST } = process.env;
		return argon2.hash(password, {
			type: argon2.argon2id,
			memoryCost: parseInt(ARGON_MEMORY_COST as string),
			parallelism: parseInt(ARGON_PARALLELISM as string),
			timeCost: parseInt(ARGON_TIME_COST as string),
		});
	} catch (error) {
		console.error(error);
	}

}