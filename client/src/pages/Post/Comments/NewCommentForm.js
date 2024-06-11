import { Form, Select, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import styles from "./styles.module.css"

import React, { useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, NEW_COMMENT_MUTATION } from "./queries";

function NewCommentForm({post_id}) {

  const formRef = useRef()

  const {loading:usersLoading, data:usersData} = useQuery(GET_USERS)

  const [saveComment, {loading,data,error}] = useMutation(NEW_COMMENT_MUTATION)


  const onFinish = async (values) => {
    
    try {

      await saveComment({
        variables:{
          data:{
            ...values,
            post_id
          }
        }
      })

      message.success("Comment saved",4)
      formRef.current.resetFields()


    } catch (error) {
      message.error("Comment not saved",4)
      console.log(error.message)
    }
  };

  return (
    <div>
      <Form name="customized_form_controls" layout="block" onFinish={onFinish} ref={formRef}>
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
          disabled={usersLoading || loading}
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
          <TextArea disabled={loading} placeholder="Enter a comment" rows={4} />
        </Form.Item>

        <Form.Item
        className={styles.buttonFormItem}
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewCommentForm;
