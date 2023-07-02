import { ApolloClient, InMemoryCache } from "@apollo/client";
import { serverUrl } from "@/data/config";

const client = new ApolloClient({
  uri: `${serverUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
