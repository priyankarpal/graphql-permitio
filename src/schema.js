import gql from 'graphql-tag';

const typeDefs=gql`
  type Task {
    id: ID!
    title: String!
    description: String
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): Boolean
  }
`;

export default typeDefs;
