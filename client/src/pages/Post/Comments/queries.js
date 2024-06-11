import { gql } from "@apollo/client";

export const GET_USERS = gql`

    query getAllUsers{
        users{
            id
            fullname
        }
    }

`

export const NEW_COMMENT_MUTATION =gql`
mutation addComment($data: CreateCommentInput!){
  	createComment(data:$data){
    id
      text,
      post_id
      user_id
    }
}
`