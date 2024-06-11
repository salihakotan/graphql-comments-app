import React from 'react'
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from 'antd/lib/mentions';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS, NEW_POST_MUTATION } from './queries';

import styles from "./styles.module.css"

import { useNavigate } from 'react-router-dom';




function NewPostForm() {


  const navigate = useNavigate()

  const [savePost, {loading,data}] = useMutation(NEW_POST_MUTATION)


  const {loading:usersLoading, data:usersData} = useQuery(GET_USERS)

  console.log(usersData)

  const [form] = Form.useForm();


  const onFinish = async(values) => {
    console.log("Success:", values);

    try {
      await savePost({
        variables:{
          data: values
        }
      })


      message.success("Post saved",4)

      navigate("/")


    } catch (error) {
        message.error("post not saved: ", 6)
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
    }
  };
  
  return (
    <div>

<Form
        name="basic"
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please input post title!",
            },
          ]}
        >
          <Input disabled={loading} placeholder='Enter title' />
        </Form.Item>

        <Form.Item
          name="short_description"
          rules={[
            {
              required: true,
              message: "Please input short description!",
            },
          ]}
        >
          <Input disabled={loading} placeholder='Enter shor description' />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input post description!",
            },
          ]}
        >
          <TextArea disabled={loading} rows={4} placeholder='Enter description' />
        </Form.Item>

        <Form.Item
          name="cover"
          rules={[
            {
              required: true,
              message: "Please input cover image link!",
            },
          ]}
        >
          <Input disabled={loading} placeholder='Enter cover image link' />
        </Form.Item>

       
        <Form.Item
        name="user_id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
        loading={usersLoading}
        disabled={usersLoading || loading}
          placeholder="Select a user"
          onChange={onGenderChange}
          allowClear
        >
         {
          usersData && usersData.users.map((user)=>  <Select.Option key={user.id} value={user.id}>{user.fullname}</Select.Option>)
         }
        </Select>
      </Form.Item>


        <Form.Item className={styles.buttonFormItem}
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button loading={loading} type="primary" htmlType="submit">
            Add post
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default NewPostForm