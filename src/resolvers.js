// const bcrypt = require('bcryptjs')

// const resolvers = {
//   Query: {
//     async user (root, { id }, { models }) {
//       return models.User.findById(id)
//     },
//     async allRecipes (root, args, { models }) {
//       return models.Recipe.findAll()
//     },
//     async recipe (root, { id }, { models }) {
//       return models.Recipe.findById(id)
//     }
//   },
//   Mutation: {
//     async createUser (root, { name, email, password }, { models }) {
//       return models.User.create({
//         name,
//         email,
//         password: await bcrypt.hash(password, 10)
//       })
//     },
//     async createRecipe (
//       root,
//       { userId, title, ingredients, direction },
//       { models }
//     ) {
//       return models.Recipe.create({
//         userId,
//         title,
//         ingredients,
//         direction
//       })
//     }
//   },
//   User: {
//     async recipes (user) {
//       return user.getRecipes()
//     }
//   },
//   Recipe: {
//     async user (recipe) {
//       return recipe.getUser()
//     }
//   }
// }

// module.exports = resolvers


 const {PubSub, withFilter} = require('apollo-server');
 const {Message} = require('../models');



// require('dotenv').config();

const MESSAGE_CREATED = 'MESSAGE_CREATED';
const MESSAGE_UPDATED = 'MESSAGE_UPDATED';

const pubsub = new PubSub();

const resolvers = {
	Query: {
		async allMessages() {
			return await Message.all({order: [['id', 'DESC']]});
		},
		async fetchMessage(_, {id}) {
			return await Message.findById(id);
		}
	},
	Mutation: {
		async createMessage(_, {text}) {
			const message = await Message.create({text});
			await pubsub.publish(MESSAGE_CREATED, {messageCreated: message});
			return message;
		},
		async updateMessage(_, {id, text, isFavorite}) {
			const message = await Message.findById(id);
			await message.update({text, isFavorite}).then(message => {
				pubsub.publish(MESSAGE_UPDATED, {messageUpdated: message});
			});
			return message;
		}
	},
	Subscription: {
		messageCreated: {
			subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED])
		},
		messageUpdated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator('MESSAGE_UPDATED'),
				(payload, variables) => {
					return payload.messageUpdated.id === variables.id;
				}
			)
		}
	}
};

module.exports = resolvers;