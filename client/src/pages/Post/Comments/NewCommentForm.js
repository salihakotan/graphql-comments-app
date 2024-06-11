import { Form, Select, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import styles from "./styles.module.css"

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./queries";

function NewCommentForm() {


  const {loading:usersLoading, data:usersData} = useQuery(GET_USERS)


  const onFinish = async (values) => {
    console.log("success", values);

    try {


      message.success("Comment saved")


    } catch (error) {
      message.error("Comment not saved")
    }
  };

  return (
    <div>
      <Form name="customized_form_controls" layout="block" onFinish={onFinish}>
        <Form.Item
         wrapperCol={{
            offset: 0,
            span: 10,
          }}
          name="user_id"
          rules={[
            {
              // validator: checkPrice,
            },
          ]}
        >
          <Select 
          loading={usersLoading}
            placeholder="Select a user"
           
          >
            {
              usersData && usersData.users.map((user)=> <Select.Option key={user.id} value={user.id}>{user.fullname}</Select.Option>)
            }
            
          </Select>
        </Form.Item>

        <Form.Item
        name="text"
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <TextArea placeholder="Enter a comment" rows={4} />
        </Form.Item>

        <Form.Item
        className={styles.buttonFormItem}
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewCommentForm;
