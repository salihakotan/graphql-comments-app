import React from 'react'
import { Button, Checkbox, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from 'antd/lib/mentions';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './queries';

import styles from "./styles.module.css"




function NewPostForm() {


  const {loading:usersLoading, data:usersData} = useQuery(GET_USERS)

  console.log(usersData)

  const [form] = Form.useForm();


  const onFinish = (values) => {
    console.log("Success:", values);
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
          <Input placeholder='Enter title' />
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
          <Input placeholder='Enter shor description' />
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
          <TextArea rows={4} placeholder='Enter description' />
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
          <Input placeholder='Enter cover image link' />
        </Form.Item>

       
        <Form.Item
        name="user"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
        loading={usersLoading}
        disabled={usersLoading}
          placeholder="Select a user"
          onChange={onGenderChange}
          allowClear
        >
         {
          usersData && usersData.users.map((user)=>  <Option key={user.id} value={user.id}>{user.fullname}</Option>)
         }
        </Select>
      </Form.Item>


        <Form.Item className={styles.buttonFormItem}
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add post
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default NewPostForm