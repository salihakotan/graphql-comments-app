import { Button, Divider } from "antd";
import React from "react";
import styles from "./styles.module.css";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "./queries";
import { Comment, List } from "antd";


function Comments({ post_id }) {


  const [loadComments, {called, loading, data }] = useLazyQuery(GET_POST_COMMENTS, {
    variables: {
      id: post_id,
    },
  });

  return (
    <>
      <Divider>Comments</Divider>
      <div className={styles.showCommentsBtnContainer}>
        {(!called || loading) && (
            <Button  loading={loading} onClick={() => loadComments()}>
          Show Comments
        </Button>
        )} 
      </div>
      {!loading && data && (
        <List
          className="comment-list"
          header={`${data.post.comments.length} replies`}
          itemLayout="horizontal"
          dataSource={data.post.comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullname}
                avatar={item.user.profile_photo}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </>
  );
}

export default Comments;
