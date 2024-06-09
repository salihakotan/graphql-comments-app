import { gql } from "@apollo/client";

export const GET_POST = gql`
query post($id:ID!){
  post(id:$id){
    id,
    title,
    description,
   cover,
    user{
      profile_photo
    }
  }
}
`


export const GET_POST_COMMENTS = gql`
query getComments($id:ID!){
  post(id:$id){
    comments{id,text
    user{id,fullname,profile_photo}
    }
  }
}
`