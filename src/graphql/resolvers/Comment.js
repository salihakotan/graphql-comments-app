const Comment={
    user: (parent, args,{db}) =>
      db.users.find((user) => user.id === parent.user_id),
    post: (parent, args,{db}) =>
      db.posts.find((post) => post.id === parent.post_id),
  }

  module.exports.Comment = Comment