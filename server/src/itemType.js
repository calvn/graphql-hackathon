import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {items, reviews} from './newDb';
import reviewType from './reviewType';

const itemType = new GraphQLObjectType({
  name: 'Item',
  description: 'The item of the cool thing you want.',
  fields:() => ({
    id: {
      type: GraphQLString,
      resolve: (item) => `item-${item.id}`,
    },
    name: {type: GraphQLString},
    link: {type: GraphQLString},
    price: {type: GraphQLFloat},
    stars: {type: GraphQLInt},
    reviews: {
      type: new GraphQLList(reviewType),
      resolve: (item) => {
        const itemReviews = reviews.filter(
          review => review.itemId === item.id
        );
        return itemReviews;
      }
    }
  }),
});

export const itemInputType = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    link: {type: GraphQLString},
    stars: {type: GraphQLString},
    price: {type: GraphQLFloat},
  }),
});


export default itemType;
