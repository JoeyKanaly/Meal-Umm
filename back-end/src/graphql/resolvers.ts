import { addFoodMutation } from './mutations';
import { foodQuery, foodsQuery } from './queries';

export const resolvers = {
	Query: {
		foods: foodsQuery,
		food: foodQuery,
	},
	Mutation: {
		addFood: addFoodMutation,
	},
};
