
import { Avatar, Button, List, Skeleton } from 'antd';


const data = [
  {
    "gender": "female",
    "name": {
      "title": "Ms",
      "first": "Victoria",
      "last": "Soto"
    },
    "email": "victoria.soto@example.com",
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/55.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/55.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/55.jpg"
    },
    "nat": "AU"
  },
  {
    "gender": "female",
    "name": {
      "title": "Ms",
      "first": "Victoria",
      "last": "Soto"
    },
    "email": "victoria.soto@example.com",
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/55.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/55.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/55.jpg"
    },
    "nat": "AU"
  }
]


function Home() {
  return (
    <div>
      <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    />
    </div>
  )
}

export default Home