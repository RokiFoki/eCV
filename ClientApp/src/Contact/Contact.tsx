import React from 'react';
import styles from './Contact.module.scss';

import { Form, Input, Button, PageHeader, Typography } from 'antd';
const { Paragraph, Title } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: 'Not a valid email!',
  }
};

const Contact: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
  <div className={styles.Contact}>
    <PageHeader title="Contact (Form not working yet)" className="page-title" />
    <section className={styles.Content}>
      <Typography style={{textAlign: 'center'}}>
        <Title level={4}>LET'S GET IN TOUCH!</Title>
        <Paragraph>
          Please fill in the form below and I try to reply within 24 hours. 
        </Paragraph>
      </Typography>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className={styles.Form}>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name={['user', 'message']} label="Message" rules={[{ required: true}]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  </div>
)};

export default Contact;