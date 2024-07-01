const { ApolloServer, gql }=require('apollo-server');
const { Permit }=require('permitio');

const typeDefs=gql`
  type Query {
    hello: String
    secureData: String
  }
`;

// Initialize Permit.io
const permit=new Permit({
    token: 'YOUR_PERMIT_API_KEY',
    projectId: 'YOUR_PROJECT_ID',
    environment: 'YOUR_ENVIRONMENT',
});

const resolvers={
    Query: {
        hello: () => 'Hello, world!',
        secureData: async (parent, args, context) => {
            const hasPermission=await permit.check(context.user.id, 'read', 'secure_data');
            if (!hasPermission) {
                throw new Error('Unauthorized');
            }
            return 'This is secure data';
        },
    },
};

const users={
    'user-id-123': { roles: ['reader'] },
};

const server=new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user=users['user-id-123'];
        return { user };
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
