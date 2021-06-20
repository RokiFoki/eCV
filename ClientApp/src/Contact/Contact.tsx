import React from 'react';
import styles from './Contact.module.scss';

import { Form, Input, Button, PageHeader, Typography, notification } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
  const [form] = Form.useForm();
  const onFinish = (message: any) => {
    fetch('/api/contact/message',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },    
      body: JSON.stringify(message)
    }).then(response => {
      if (response.status === 200) {
        notification.open({
          message: 'Sending Message Completed',
          icon: <CheckCircleOutlined style={{ color: 'hsl(100, 100%, 35%)' }} />,
        });
        form.resetFields();
      } else {
        notification.open({
          message: 'Sending Message Failed',
          icon: <ExclamationCircleOutlined style={{ color: 'hsl(0, 100%, 50%)' }} />,
        });
      }
    }).catch(e => {
      notification.open({
        message: 'Sending Message Failed',
        icon: <ExclamationCircleOutlined style={{ color: 'hsl(0, 100%, 50%)' }} />,
      });
    })
  };

  const matches = useMediaQuery('(max-width: 600px)');
  
  const formLayoutData = matches ? null : {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }; 

  const layout = matches ? 'vertical' : undefined;

  return (
  <div className={styles.Contact}>
    <PageHeader title="Contact" className="page-title" />
    <section className={styles.Content}>
      <Typography style={{textAlign: 'center'}}>
        <Title level={4}>LET'S GET IN TOUCH!</Title>
        <Paragraph>
          Please fill in the form below and I try to reply within 24 hours. 
        </Paragraph>
      </Typography>
      <Form form={form} {...formLayoutData} layout={layout} onFinish={onFinish} 
          validateMessages={validateMessages} className={styles.Form}>
        <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['email']} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name={['message']} label="Message" rules={[{ required: true}]}>
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