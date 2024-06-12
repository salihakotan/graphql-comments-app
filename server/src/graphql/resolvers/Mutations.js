import mongoose, { Mongoose, Schema, Types } from 'mongoose';
import { nanoid } from 'nanoid';

export const Mutation={
    createUser: async(parent, { data }, {pubsub,_db}) => {
      
      const newUser = new _db.User({
        ...data
      })

      const user = await newUser.save()

      pubsub
        .publish("userCreated", { userCreated: user })
        .then(console.log("user created"));

      return user;
    },

    updateUser: async(parent, { id, data }, {pubsub,_db}) => {
      const user_index = await _db.User.findById(id)

      if (!user_index) {
        throw new Error("User not found");
      }

      const updated_user = await _db.User.findByIdAndUpdate(id,data,{new:true})

      pubsub.publish("userUpdated", {userUpdated: updated_user})

      return updated_user;
    },

    deleteUser: async(parent, { id }, {pubsub,_db}) => {
      const user_index = await _db.User.findById(id)


      if (!user_index) {
        throw new Error("User not found");
      }

      const deleted_user = await _db.User.findByIdAndDelete(id)
   
      pubsub.publish("userDeleted",{userDeleted: deleted_user})
      return deleted_user;
    },

    deleteAllUsers: async(_,__, {pubsub,_db}) => {
      
      const delete_users = await _db.User.deleteMany({})

      return {
        count: delete_users.deletedCount,
      };
    },

    createPost: async(parent, { data }, {pubsub,_db}) => {
      const newPost = new _db.Post({
        ...data
      })

      const post = await newPost.save()
      const postCount = await _db.Post.countDocuments()


      const user = await _db.User.findById(data.user)
      user.posts.push(post.id)
      user.save()


      pubsub.publish("postCreated", {postCreated: post})
      pubsub.publish("postCount", {postCount})



      return post;
    },

    updatePost: async(parent, { id, data }, {pubsub,_db}) => {
      const post_index =  await _db.Post.findById(id)

      if (!post_index) {
        throw new Error("Post not found");
      }

      const updated_post = await _db.Post.findByIdAndUpdate(id,data,{
        new:true
      })

      // const updated_post = (db.posts[post_index] = {
      //   ...db.posts[post_index],
      //   ...data,
      // });

      pubsub.publish("postUpdated", {postUpdated: updated_post})


      return updated_post;
    },

    deletePost: async(parent, { id }, {pubsub,_db}) => {
      const post_index = await _db.Post.findById(id)

      if (!post_index) {
        throw new Error("Post not found");
      }

      const deleted_post = await _db.Post.findByIdAndDelete(id)
      const postCount = await _db.Post.countDocuments()

      pubsub.publish("postDeleted", {postDeleted: deleted_post})
      pubsub.publish("postCount", {postCount})


      return deleted_post;
    },

    deleteAllPosts: async(_,__, {pubsub,_db}) => {
     
      const delete_posts = await _db.Post.deleteMany({})


      pubsub.publish("postCount", {postCount:0})

      return { count: delete_posts.deletedCount };
    },

    createComment: async(parent, { data }, {pubsub,_db}) => {
     
      const newComment = new _db.Comment({
        ...data
      })
      const comment = await newComment.save()

      const commentCount = await _db.Comment.countDocuments()

      const post = await _db.Post.findById(data.post)
      post.comments.push(comment.id)

      const user = await _db.User.findById(data.user)
      user.comments.push(comment.id)

      await user.save()
      await post.save()


      pubsub.publish("commentCreated", {commentCreated: comment})
      pubsub.publish("commentCount", {commentCount})


      return comment;
    },

    updateComment: async(parent, { id, data }, {pubsub,_db}) => {
      const comment_index = await _db.Comment.findById(id)

      if (!comment_index) {
        throw new Error("Comment not found");
      }

      const updated_comment = await _db.Comment.findByIdAndUpdate(id,data,{
        new:true
      })

      pubsub.publish("commentUpdated", {commentUpdated: updated_comment})


      return updated_comment;
    },

    deleteComment: async(parent, { id }, {pubsub,_db}) => {
      const comment_index = await _db.Comment.findById(id)

      if (!comment_index) {
        throw new Error("Comment not found");
      }
      const deleted_comment = await _db.Comment.findByIdAndDelete(id)
      
      const commentCount = await _db.Comment.countDocuments()
      

      pubsub.publish("commentDeleted", {commentDeleted: deleted_comment})
      pubsub.publish("commentCount", {commentCount})


      return deleted_comment;
    },
    deleteAllComments: async(_,__, {pubsub,_db}) => {

      const delete_comments = await _db.Comment.deleteMany({})
      const commentCount = delete_comments.deletedCount


      pubsub.publish("commentCount", {commentCount:0})


      return { count: commentCount };
    },
  }

