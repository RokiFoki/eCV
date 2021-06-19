import React from 'react';
import styles from './Contact.module.scss';

import { Form, Input, Button, PageHeader, Typography } from 'antd';
import { useMediaQuery } from '../Shared/utils';
const { Paragraph, Title } = Typography;

/* eslint-disable no-template-curly-in-string */
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

  const matches = useMediaQuery('(max-width: 600px)');
  
  const formLayoutData = matches ? null : {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }; 

  const layout = matches ? 'vertical' : undefined;

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
      <Form {...formLayoutData} layout={layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className={styles.Form}>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name={['user', 'message']} label="Message" rules={[{ required: true}]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" className={matches ? styles.FullWidth : styles.SendButton}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </section>
  </div>
)};

export default Contact;