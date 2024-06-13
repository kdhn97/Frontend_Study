/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createCustomer($name: String!, $address: String!, $email: String!) {\n    createCustomer(\n        name: $name\n        address: $address\n        email: $email) {\n            id\n            name\n            address\n            email\n    }\n  }\n": types.CreateCustomerDocument,
    "\n  query customers {\n    customers {\n      id\n      name\n      address\n      email\n    }\n  }\n": types.CustomersDocument,
    "\n  mutation deleteCustomer($id: ID!) {\n    deleteCustomer(\n        id: $id) {\n            id\n            name\n            address\n            email\n    }\n  }\n": types.DeleteCustomerDocument,
    "\n  mutation updateCustomer($id: ID!, $name: String!, $address: String!, $email: String!) {\n    updateCustomer(\n        id: $id\n        name: $name\n        address: $address\n        email: $email) {\n            id\n            name\n            address\n            email\n    }\n  }\n": types.UpdateCustomerDocument,
    "\n  query customer($id: ID!) {\n    customer(id: $id) {\n      id\n      name\n      address\n      email\n    }\n  }\n": types.CustomerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createCustomer($name: String!, $address: String!, $email: String!) {\n    createCustomer(\n        name: $name\n        address: $address\n        email: $email) {\n            id\n            name\n            address\n            email\n    }\n  }\n"): (typeof documents)["\n  mutation createCustomer($name: String!, $address: String!, $email: String!) {\n    createCustomer(\n        name: $name\n        address: $address\n        email: $email) {\n            id\n            name\n            address\n            email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query customers {\n    customers {\n      id\n      name\n      address\n      email\n    }\n  }\n"): (typeof documents)["\n  query customers {\n    customers {\n      id\n      name\n      address\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteCustomer($id: ID!) {\n    deleteCustomer(\n        id: $id) {\n            id\n            name\n            address\n            email\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCustomer($id: ID!) {\n    deleteCustomer(\n        id: $id) {\n            id\n            name\n            address\n            email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateCustomer($id: ID!, $name: String!, $address: String!, $email: String!) {\n    updateCustomer(\n        id: $id\n        name: $name\n        address: $address\n        email: $email) {\n            id\n            name\n            address\n            email\n    }\n  }\n"): (typeof documents)["\n  mutation updateCustomer($id: ID!, $name: String!, $address: String!, $email: String!) {\n    updateCustomer(\n        id: $id\n        name: $name\n        address: $address\n        email: $email) {\n            id\n            name\n            address\n            email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query customer($id: ID!) {\n    customer(id: $id) {\n      id\n      name\n      address\n      email\n    }\n  }\n"): (typeof documents)["\n  query customer($id: ID!) {\n    customer(id: $id) {\n      id\n      name\n      address\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;