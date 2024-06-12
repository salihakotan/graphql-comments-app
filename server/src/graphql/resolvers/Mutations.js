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

      const postCount = delete_posts.deletedCount

      pubsub.publish("postCount", {postCount})

      return { count: postCount };
    },

    createComment: (parent, { data }, {pubsub,db}) => {
      const comment = {
        id: nanoid(),
        // text, //short using
        // user_id,//short using
        // post_id//short using
        ...data,
      };

      db.comments.unshift(comment);

      pubsub.publish("commentCreated", {commentCreated: comment})
      pubsub.publish("commentCount", {commentCount: db.comments.length})


      return comment;
    },

    updateComment: (parent, { id, data }, {pubsub,db}) => {
      const comment_index = db.comments.findIndex(
        (comment) => comment.id === id
      );

      if (comment_index === -1) {
        throw new Error("Comment not found");
      }

      const updated_comment = (db.comments[comment_index] = {
        ...db.comments[comment_index],
        ...data,
      });

      pubsub.publish("commentUpdated", {commentUpdated: updated_comment})


      return updated_comment;
    },

    deleteComment: (parent, { id }, {pubsub,db}) => {
      const comment_index = db.comments.findIndex(
        (comment) => comment.id === id
      );
      if (comment_index === -1) {
        throw new Error("Comment not found");
      }
      const deleted_comment = db.comments[comment_index];
      db.comments.splice(comment_index, 1);

      pubsub.publish("commentDeleted", {commentDeleted: deleted_comment})
      pubsub.publish("commentCount", {commentCount: db.comments.length})


      return deleted_comment;
    },
    deleteAllComments: (_,__, {pubsub,db}) => {
      const length = db.comments.length;
      db.comments.splice(0, length);

      pubsub.publish("commentCount", {commentCount: db.comments.length})


      return { count: length };
    },
  }

