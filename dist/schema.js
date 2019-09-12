"use strict";

// const { gql } = require('apollo-server')
// const typeDefs = gql`
//   type User {
//     id: Int!
//     name: String!
//     email: String!
//     recipes: [Recipe!]!
//   }
//   type Recipe {
//     id: Int!
//     title: String!
//     ingredients: String!
//     direction: String!
//     user: User!
//   }
//   type Query {
//     user(id: Int!): User
//     allRecipes: [Recipe!]!
//     recipe(id: Int!): Recipe
//   }
//   type Mutation {
//     createUser(name: String!, email: String!, password: String!): User!
//     createRecipe(
//       userId: Int!
//       title: String!
//       ingredients: String!
//       direction: String!
//     ): Recipe!
//   }
// `
// module.exports = typeDefs
const {
  gql
} = require('apollo-server'); // Define our schema using the GraphQL schema language


const typeDefs = gql`
	type Message {
		id: Int!
		text: String!
		isFavorite: Boolean!
	}
	type Query {
		allMessages: [Message]
		fetchMessage(id: Int!): Message
	}
	type Mutation {
		createMessage(text: String!): Message
		updateMessage(id: Int!, text: String!, isFavorite: Boolean!): Message
	}
	type Subscription {
		messageCreated: Message
		messageUpdated(id: Int!): Message
	}
`;
module.exports = typeDefs;