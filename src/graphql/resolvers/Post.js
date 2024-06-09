const Post={
    user: (parent, args,{db}) =>
      db.users.find((user) => user.id === parent.user_id),
    comments: (parent, args,{db}) =>
      db.comments.filter((comment) => comment.post_id === parent.id),
  }

  module.exports.Post = Post