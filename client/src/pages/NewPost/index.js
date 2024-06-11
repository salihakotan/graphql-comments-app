import React from "react";
import NewPostForm from "./NewPostForm";

import Title from "antd/lib/typography/Title";


function NewPost() {
  return (
    <div>
      <Title level={3}>New Post</Title>

      <NewPostForm/>
    </div>
  );
}

export default NewPost;
