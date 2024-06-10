import { gql } from "@apollo/client";


 const postFragment = gql`
    fragment PostFragment on Post {
      id
      title
      description
      short_description
      user {
        profile_photo
      }
    }
  `


export const GET_POSTS = gql`
  query getAllPosts {
    posts {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const POSTS_SUBSCRIPTION = gql`
  subscription {
    postCreated {
      ...PostFragment
    }
  }
  ${postFragment}
`;
