import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_BLOGYOURSTORY_ENDPOINT;
const authToken = process.env.AUTH_TOKEN;

export default async function comments(req, res) {
  console.log({authToken});
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${authToken}`
    }
  }) 

  const query = gql `
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
      
    }
  `
    try{
        const result = await graphQLClient.request(query, req.body)

        return res.status(200).send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};