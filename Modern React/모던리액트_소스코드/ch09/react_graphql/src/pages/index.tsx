import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CustomerList from './CustomerList';
import CustomerAdd from "./CustomerAdd";
import CustomerUpdate from "./CustomerUpdate";
import CustomerDelete from "./CustomerDelete";
import CustomerListApollo from './CustomerListApollo';
import CustomerAddApollo from "./CustomerAddApollo";
import CustomerUpdateApollo from "./CustomerUpdateApollo";
import CustomerDeleteApollo from "./CustomerDeleteApollo";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});
export default function Home() {
  return (
    <ApolloProvider client={client}>
      {/* <CustomerList/> */}
      {/* <CustomerAdd/> */}
      {/* <CustomerUpdate/> */}
      {/* <CustomerDelete/> */}
      {/* <CustomerListApollo/> */}
      <CustomerAddApollo/>
      {/* <CustomerUpdateApollo/> */}
      {/* <CustomerDeleteApollo/> */}
    </ApolloProvider>
  );
}
