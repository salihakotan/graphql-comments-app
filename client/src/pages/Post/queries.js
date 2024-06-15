import { gql } from "@apollo/client";

export const GET_POST = gql`
query post($id:ID!){
  post(id:$id){
    _id,
    title,
    description,
   cover,
    user{
      profile_photo
    }
  }
}
`

const commentFragment = gql`
    fragment CommentFragment on Comment {
      _id
      text
      user{_id,fullname,profile_photo}
    }
`



export const GET_POST_COMMENTS = gql`
query getComments($id:ID!){
  post(id:$id){
    comments {
      ...CommentFragment
    }
   
  }
}
${commentFragment}
`

export const COMMENTS_SUBSCRIPTIONS =gql`
  subscription ($post_id:ID){
    commentCreated(post_id:$post_id){
      ...CommentFragment
    }
  }

  ${commentFragment}

`