const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");

// Product type

const ProductType = new GraphQLObjectType({
  name: "Products",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    price: { type: GraphQLInt },
    purchased: { type: GraphQLInt },
    img: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

//Root query

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return fetch
          .get
          //Må opprette db
          ();
      }
    }
  }
});
