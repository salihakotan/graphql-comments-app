
import { useQuery } from '@apollo/client';
import { Avatar, List } from 'antd';
import Loading from 'components/Loading';
import { GET_POSTS, POSTS_SUBSCRIPTION } from './queries';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css"
import { useEffect } from 'react';




function Home() {


  const {loading,error,data,subscribeToMore} = useQuery(GET_POSTS)



  useEffect(()=> {
    subscribeToMore({
      document:POSTS_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData})=> {
        if(!subscriptionData.data) return prev.posts;

        return {
          posts:[
            subscriptionData.data.postCreated,
            ...prev.posts, 
          ]
        }
      }
    })
  },[subscribeToMore])

  if(loading){
    return <Loading/>
  }


  if(error){
    return <div>Error {error.message}</div>
  }


  return (
    <div>
      <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={data.posts}
      renderItem={(item) => (
        <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.user.profile_photo} />}
              title={<Link to={`/post/${item.id}`}>{item.title}</Link>}
              description={<Link className={styles.listItemDesc} to={`/post/${item.id}`}>{item.short_description}</Link>}
            />
        </List.Item>
      )}
    />
    </div>
  )
}

export default Home