import React from 'react';
import { Layout, Menu, } from 'antd';
import { UserOutlined, PhoneFilled } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChess } from '@fortawesome/free-solid-svg-icons'
import AboutMe from './AboutMe/AboutMe.lazy';
import Experience from './Experience/Experience.lazy';
import Skills from './Skills/Skills.lazy';
import Contact from './Contact/Contact.lazy';

const { Sider } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Sider id="components-layout-demo-fixed-sider"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">About me</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faBook} />}>
            <Link to="/experience">Experience</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FontAwesomeIcon icon={faChess} />}>
            <Link to="/skills">Skills</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<PhoneFilled />}>
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="container">
        <Switch>
          <Route exact path="/">
            <AboutMe></AboutMe>
          </Route>
          <Route path="/experience">
            <Experience></Experience>
          </Route>
          <Route path="/skills">
            <Skills></Skills>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </Layout>     
    </Layout>
  </Router>
);

export default App;
