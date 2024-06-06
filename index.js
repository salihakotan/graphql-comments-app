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

    type Post{
        id:ID!
        title:String!
        user_id:ID!
        user:User!
        comments:[Comment!]!
    }

    type Comment{
        id:ID!
        text:String!
        post_id:ID!
        user_id:ID!
        user:User!
        post:Post!
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
        createUser(fullname:String!): User!
        createPost(title:String!, user_id:ID!): Post!
        
        createComment(text:String!,post_id:ID!,user_id:ID!):Comment!
        
    }

`;
const resolvers = {

    Mutation: {
        createUser: (parent,{fullname}) => {
            const user = {
                id:nanoid(),
                fullname:fullname,
            }

            users.push(user)
            return user

        },

        createPost: (parent,{title,user_id})=> {
            const post = {
                id:nanoid(),
                title:title,
                user_id:user_id
            }

            posts.push(post)

            return post
        },

        createComment: (parent,{text,post_id,user_id})=> {
            const comment = {
                id:nanoid(),
                text, //short using
                user_id,//short using
                post_id//short using
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
