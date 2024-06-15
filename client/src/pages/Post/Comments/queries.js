import { gql } from "@apollo/client";

export const GET_USERS = gql`

    query getAllUsers{
        users{
            _id
            fullname
        }
    }

`

export const NEW_COMMENT_MUTATION =gql`
mutation addComment($data: CreateCommentInput!){
  	createComment(data:$data){
    _id
      text,
    #   post{_id}
    #   user{_id}
    }
}
`