export const Query={
    users: async(_,__,{_db}) => {
      const users = await _db.User.find()
      return users
    },
    user: async(parent, args, {_db}) => {
      // db.users.find((user) => user.id === args.id)
      const user = await _db.User.findById(args.id)
      return user
    },

    posts: async(_,__,{_db}) => {
      const posts = await _db.Post.find()
      return posts
    },
    post: async(parent, args,{_db}) => {
      const post = await _db.Post.findById(args.id)
      return post
    },
    postCount: (_,__,{db}) => db.posts.length,


    comments:  async(_,__,{_db}) => {
      const comments = await _db.Comment.find()
      return comments
    },
    comment: async(parent, args,{_db}) => {
      const comment = await _db.Comment.findById(args.id)
      return comment
    }

  }
  