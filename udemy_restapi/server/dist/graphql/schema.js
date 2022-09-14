"use strict";
exports.__esModule = true;
exports.graphqlSchema = void 0;
// GraphQL 서비스 유형 정리
var graphql_1 = require("graphql");
// hello 쿼리를 보내서 텍스트를 받는 기본적인 스키마
exports.graphqlSchema = (0, graphql_1.buildSchema)("\n  type Post {\n    _id: ID!\n    title: String!\n    content: String!\n    imageUrl: String!\n    creator: User!\n    createdAt: String!\n    updatedAt: String!\n  }\n\n  type User {\n    _id: ID!\n    email: String!\n    name: String!\n    password: String!\n    status: String!\n    posts: [Post!]!\n  }\n\n  type AuthData {\n    token: String!\n    userId: String!\n  }\n\n  type PostData {\n    posts: [Post!]!\n    totalPosts: Int!\n  }\n\n  input UserInputData {\n    email: String!\n    name: String!\n    password: String!\n  }\n\n  input PostInputData {\n    title: String!\n    content: String!\n    imageUrl: String!\n  }\n\n  type RootQuery {\n    login(email: String!, password: String!): AuthData!\n    posts(page: Int): PostData!\n    post(id: ID!): Post!\n  }\n\n  type RootMutation {\n    createUser(userInput: UserInputData): User!\n    createPost(postInput: PostInputData): Post!\n  }\n\n  schema {\n    query: RootQuery\n    mutation: RootMutation\n  }\n");
