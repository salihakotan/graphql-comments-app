const users = [
  { id: "1", fullname: "Buket Soyhan", profile_photo:"https://randomuser.me/api/portraits/women/79.jpg" },
  { id: "2", fullname: "Asli Demirci", profile_photo:"https://randomuser.me/api/portraits/men/36.jpg" },
];



const posts = [
  { id: "1", title: "Buketin gönderisi", user_id: "1", description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, porro?" },
  { id: "2", title: "Buketin 2. gönderisi", user_id: "1", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quo in mollitia doloremque?" },
  { id: "3", title: "Aslinin gönderisi", user_id: "2", description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit."  },
];
const comments = [
  { id: "1", text: "buketin yorumu", post_id: "1", user_id: "1" },
  { id: "2", text: "aslının yorumu", post_id: "1", user_id: "2" },
  { id: "3", text: "buketin 2.yorumu", post_id: "2", user_id: "1" },
];

const db = {
  users,
  posts,
  comments,
};

export { db };
