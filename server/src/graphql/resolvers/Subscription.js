import { withFilter } from "graphql-subscriptions";
export const Subscription={
    
    userCreated: {
      subscribe: (_, __,{pubsub}) => pubsub.asyncIterator("userCreated"),
    },
    userUpdated: {
      subscribe: (_,__,{pubsub})=> pubsub.asyncIterator("userUpdated")
    },
    userDeleted:{
      subscribe:(_,__,{pubsub})=> pubsub.asyncIterator("userDeleted")
    },

    //POSTS

    postCreated: {
      subscribe: withFilter(
        (_, __,{pubsub}) => pubsub.asyncIterator("postCreated"),
        (payload,variables) => {
          return variables.user_id ? payload.postCreated.user === variables.user_id : true
        }
      )
    },
    postUpdated: {
      subscribe: (_,__,{pubsub})=> pubsub.asyncIterator("postUpdated")
    },
    postDeleted:{
      subscribe:(_,__,{pubsub})=> pubsub.asyncIterator("postDeleted")
    },
    postCount:{
      subscribe: async(_,__,{pubsub,_db})=> {
        const postCount = await _db.Post.countDocuments()
        setTimeout(() => {
            pubsub.publish("postCount",{postCount})
        });
        return pubsub.asyncIterator("postCount")
      }

    },



    //COMMENTS

    commentCreated: {
      subscribe: withFilter(
        (_, __,{pubsub}) => pubsub.asyncIterator("commentCreated"),
        (payload,variables)=> {
          return variables.post_id ? payload.commentCreated.post === variables.post_id : true
        }
      )
    },
    commentUpdated: {
      subscribe: (_,__,{pubsub})=> pubsub.asyncIterator("commentUpdated")
    },
    commentDeleted:{
      subscribe:(_,__,{pubsub})=> pubsub.asyncIterator("commentDeleted")
    },
    commentCount:{
      subscribe:async(_,__,{pubsub,_db})=> {
        const commentCount = await _db.Comment.countDocuments()

        setTimeout(() => {
            pubsub.publish("commentCount",{commentCount})
        });
        return pubsub.asyncIterator("commentCount")
      }

    },

  }

