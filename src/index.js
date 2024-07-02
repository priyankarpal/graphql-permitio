import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import Permit from 'permitio';
import taskResolvers from './resolvers/taskResolvers.js';
import typeDefs from './schema.js';

const { Permit: PermitClass }=Permit;

const permit=new PermitClass({
    token: process.env.PERMIT_API_KEY,
});

const server=new ApolloServer({
    typeDefs,
    resolvers: taskResolvers,
    context: async ({ req }) => {
        const user=await permit.getUserFromRequest(req);
        return { user, permit };
    },
});

startStandaloneServer(server, {
    listen: { port: 4001 },
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});