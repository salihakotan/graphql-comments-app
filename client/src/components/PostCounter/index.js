import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { Avatar, Badge } from "antd";
import { useQuery } from "@apollo/client";
import { GET_POST_COUNT, POST_COUNT_SUBSCRIPTION } from "./queries";
// import { GET_POST_COUNT, POST_COUNT_SUBSCRIPTION } from "./queries";
// import Loading from "components/Loading";

function PostCounter() {


    //just usesubscription
    // const {loading,data} = useSubscription(POST_COUNT_SUBSCRIPTION)

    const {loading,error,data, subscribeToMore} = useQuery(GET_POST_COUNT)

    // console.log("data", data)


    useEffect(()=> {
      subscribeToMore({
        document:POST_COUNT_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData})=> {


        //   console.log("prev",prev)
        //   console.log("SUBDATA",subscriptionData)


            // console.log("subs data", subscriptionData)
        //   if(!subscriptionData.data) return prev;
  
          return {
            posts:[
            subscriptionData.data.postCount,
           
          ]
          }
        }
      })
    },[subscribeToMore])
  
    // if(loading){
    //   return <Loading/>
    // }
  
  
    if(error){
      return <div>Error {error.message}</div>
    }

    

  return (
    <div className={styles.container}>
      <Badge count={loading ? "?" : data.postCount}>
        <Avatar shape="square" size="medium"> 
        <span className={styles.counterTitle}>Posts</span>
        </Avatar>
      </Badge>
    </div>
  );
}

export default PostCounter;
