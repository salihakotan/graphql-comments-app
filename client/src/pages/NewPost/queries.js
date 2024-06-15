import { gql } from "@apollo/client";

export const GET_USERS =gql`

    query getAllUsers {
        users{
            _id,
            fullname
        }
    }

`

export const NEW_POST_MUTATION = gql`

mutation addPost($data: CreatePostInput!){
  createPost(data:$data){
    _id,
    title,
    # user{_id}
  }
}
`