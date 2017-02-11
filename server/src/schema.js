import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {items, reviews} from './newDb';
import (itemType, itemInputType} from './itemType';
import {reviewType, reviewInputType} from './reviewType';

const rootFields = {
  items: {
    type: new GraphQLList(itemType),
    resolve: _ => {
      return items;
    }
  },
  reviewsByItemID: {
    type: new GraphQLList(reviewType),
    args: {
      id: {
        type: GraphQLString,
      }
    },
    resolve: (object, {id}, context, info) => {
      return reviews.filter(review => `review-${review.id}` == id;
    }
  },
  itemByID: {
    type: itemType,
    args: {
      id: {
        type: GraphQLString,
      }
    },
    resolve: (object, {id}, context, info) => {
      return items.find(item => `item-${item.id}` == id);
    }
  },
  itemSearch: {
    type: new GraphQLList(itemType),
    args: {
      keyword: {
        type: GraphQLString,
      }
    },
    resolve: (object, {keyword}, context, info) => {
      return items.filter(item => item.name.includes(keyword));
    }
  }
};

// Single "viewer" object for Relay root query compatibility
const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: rootFields,
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
      viewer: {
        type: Viewer,
        resolve: () => ({}),
      },
      ...rootFields,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'MutationRoot',
    fields: {
      addItem: {
        type: itemType,
        args: {
          item: {
            type: itemInputType,
          }
        },
        resolve: (object, {item}) => {
          items.push(item);
          return item;
        }
      },
      addReview: {
        type: reviewType,
        args: {
          review: {
            type: reviewInputType,
          }
        },
        resolve: (object, {review}) => {
          reviews.push(review);
          return review;
        }
      }
    }
  }),
});

export default schema;
