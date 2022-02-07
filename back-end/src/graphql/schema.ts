export const schema = `#graphql
	input FoodInput {
		name: String
	}

	type Food {
		id: ID!
		name: String
	}

	type Query {
		foods: [Food]
		food(name: String): Food
	}

	type Mutation {
		addFood(food: FoodInput): Food
	}
`;
