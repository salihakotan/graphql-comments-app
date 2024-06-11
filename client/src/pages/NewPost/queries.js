import { gql } from "@apollo/client";

export const GET_USERS =gql`

    query getAllUsers {
        users{
            id,
            fullname
        }
    }

`

export const NEW_POST_MUTATION = gql`

mutation addPost($data: CreatePostInput!){
  createPost(data:$data){
    id,
    title,
    user_id
  }
}
`