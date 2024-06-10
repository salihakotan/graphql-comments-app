import { gql } from "@apollo/client";


export const POST_COUNT_SUBSCRIPTION = gql`
subscription{
    postCount
}
`

export const GET_POST_COUNT = gql`
query postCount{
    postCount
}
`