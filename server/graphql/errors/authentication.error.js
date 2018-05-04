import { GraphQLError } from "graphql/error";


export default class AuthenticationError extends GraphQLError {
    constructor() {
        super("AuthenticationError: Unable to authenticate user with given credentials");
    }
}