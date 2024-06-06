const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { comments,users,posts } = require("./data");

const {nanoid} = require("nanoid")


const typeDefs = gql`

    type User{
        id:ID!
        fullname:String!
        posts:[Post!]!
        comments:[Comment!]!
    }

    input CreateUserInput{
        fullname:String!
    }

    type Post{
        id:ID!
        title:String!
        user_id:ID!
        user:User!
        comments:[Comment!]!
    }

    input CreatePostInput{
        title:String!
        user_id:ID!
    }

    type Comment{
        id:ID!
        text:String!
        post_id:ID!
        user_id:ID!
        user:User!
        post:Post!
    }

    input CreateCommentInput{
        text:String!
        post_id:ID!
        user_id:ID!
    }

    type Query{
        users: [User!]!
        user(id:ID!): User!


        posts: [Post!]!
        post(id:ID!): Post!



        comments: [Comment!]!
        comment(id:ID!): Comment!
    }
    

    type Mutation{
        createUser(data:CreateUserInput!): User!
        createPost(data:CreatePostInput!): Post!
        
        createComment(data:CreateCommentInput!):Comment!
        
    }

`;
const resolvers = {

    Mutation: {
        createUser: (parent,{data}) => {
            const user = {
                id:nanoid(),
                // fullname:data.fullname,
                //other using 
                ...data //get all datas 
            }

            users.push(user)
            return user

        },

        createPost: (parent,{data})=> {
            const post = {
                id:nanoid(),
                ...data
            }

            posts.push(post)

            return post
        },

        createComment: (parent,{data})=> {
            const comment = {
                id:nanoid(),
                // text, //short using
                // user_id,//short using
                // post_id//short using
                ...data
            }

            comments.push(comment)
            return comment
        }


    },


    Query: {
        users: ()=> users,
        user: (parent,args) =>  users.find((user)=> user.id === args.id),


        posts: ()=> posts,
        post: (parent,args) => posts.find((post)=> post.id === args.id),



        comments:()=> comments,
        comment: (parent,args) => comments.find((comment)=> comment.id === args.id)
    },

    User:{
        posts: (parent,args) => posts.filter((post)=> post.user_id ===parent.id),
        comments:(parent)=> comments.filter((comment)=> comment.user_id === parent.id)
    },

    Post:{
        user: (parent,args) => users.find((user)=> user.id === parent.user_id),
        comments: (parent,args) => comments.filter((comment)=> comment.post_id === parent.id)
    },
    Comment:{
        user:(parent,args) => users.find((user)=> user.id === parent.user_id),
        post:(parent,args)=> posts.find((post)=> post.id ===parent.post_id)
    }
};

const server = new ApolloServer({ typeDefs, 
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            //options
        })
    ]

});

server.listen().then(({ url }) => {
  console.log(`Server is up at ${url}`);
});
