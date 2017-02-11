import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';
import {items, reviews} from './newDb';
import itemType from './itemType';

export const reviewType = new GraphQLObjectType({
  name: 'Review',
  description: 'Review for a particular cool item.',
  fields:() => ({
    id: {
      type: GraphQLString,
      resolve: (review) => `review-${review.id}`,
    },
    user: {type: GraphQLString},
    rating: {type: GraphQLInt},
    comment: {type: GraphQLString},
    description: {type: GraphQLString},
    itemId: {type: GraphQLString},
    item: {
      type: itemType,
      resolve: (review) => {
        return items[review.itemId];
      }
    }
  }),
});

export const reviewInputType = new GraphQLInputObjectType({
  name: 'ReviewInput',
  fields:() => ({
    id: {type: GraphQLString},
    user: {type: GraphQLString},
    rating: {type: GraphQLInt},
    comment: {type: GraphQLString},
    itemId: {type: GraphQLString},
  }),
});

export default reviewType;
