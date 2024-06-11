import { Button, Divider } from "antd";
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useLazyQuery } from "@apollo/client";
import { COMMENTS_SUBSCRIPTIONS, GET_POST_COMMENTS } from "../queries";
import { Comment, List } from "antd";
import NewCommentForm from "./NewCommentForm";


function Comments({ post_id }) {


  const [loadComments, {called, loading, data, subscribeToMore }] = useLazyQuery(GET_POST_COMMENTS, {
    variables: {
      id: post_id,
    },
  });



  useEffect(()=> {
    if(!loading && called){
      subscribeToMore({
        document:COMMENTS_SUBSCRIPTIONS,
        updateQuery: (prev, {subscriptionData})=> {
          console.log(prev)
          console.log(subscriptionData.data)

         
          if(!subscriptionData.data) return prev

          return {
            post:{
              ...prev.post,
              comments:[
                subscriptionData.data.commentCreated,
                ...prev.post.comments
              ]
            }
          }
        }
      })
    }

  },[subscribeToMore,called,loading])


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
        <>

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

            <Divider>New Comment</Divider>
        <NewCommentForm post_id={post_id} />


        </>
      )}
    </>
  );
}

export default Comments;
