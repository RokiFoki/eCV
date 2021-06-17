import React, { useRef, useState } from 'react';
import { Button, Layout, Menu, } from 'antd';
import { UserOutlined, PhoneFilled, MenuOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Redirect, Route, RouteComponentProps, Switch, useLocation, withRouter } from 'react-router-dom';

import './Global.scss';
import styles from './App.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChess } from '@fortawesome/free-solid-svg-icons'
import AboutMe from './AboutMe/AboutMe.lazy';
import Experience from './Experience/Experience.lazy';
import Skills from './Skills/Skills.lazy';
import Contact from './Contact/Contact.lazy';
import { useOutsideAlerter } from './Shared/utils';


const { Sider } = Layout;

interface SideNavbarContentProps extends RouteComponentProps<any> {
  onClick?: () => void;
}

const SideNavbarContent = withRouter((props: SideNavbarContentProps) => {
  const path = props.location.pathname;
  let selectionKey = '1';
  if (path.startsWith('/experience'))  {
    selectionKey = '2';
  } else if (path.startsWith('/skills')) {
    selectionKey = '3';
  } else if (path.startsWith('/contact')) {
    selectionKey = '4';
  }
  return (
    <React.Fragment>
      <div className="logo" />
      <Menu theme="dark" mode="inline" selectedKeys={[selectionKey]}>
        <Menu.Item key="1" icon={<UserOutlined />} onClick={props.onClick}>
          <Link to="/">About me</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faBook} />} onClick={props.onClick}>
          <Link to="/experience">Experience</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faChess} />} onClick={props.onClick}>
          <Link to="/skills">Skills</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<PhoneFilled />} onClick={props.onClick}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  )
})

let toBeColapsed = false;
const App = () => {
  const [sidenavCollapsed, setSidenavCollapsed] = useState(false);
  const [redrawSkillsTime, setRedrawSkillsTime] = useState(+new Date());
  const updateCollapsed = (collapsed: boolean) => {
    if (toBeColapsed === collapsed) return;

    setRedrawSkillsTime(+new Date());
    toBeColapsed = collapsed;
    setSidenavCollapsed(collapsed);
  }
  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    updateCollapsed(true);
  })

  return (
  <Router>
    <Layout style={{height: '100vh', width: '100vw'}}>
      <Sider id="components-layout-demo-fixed-sider"
        className={`${styles.Sider} ${sidenavCollapsed ? styles.Collapsed : ''}`}
        ref={ref}
      >
        <SideNavbarContent onClick={() => updateCollapsed(true)}></SideNavbarContent>
      </Sider>
      <Layout className={styles.Container}>
        { !!sidenavCollapsed && 
          <Button type="primary" size="large" icon={<MenuOutlined />} shape="circle"
            className={styles.MenuButton}
            onClick={() => updateCollapsed(false) }></Button>}
        <Switch>
          <Route exact path="/">
            <AboutMe></AboutMe>
          </Route>
          <Route path="/experience">
            <Experience></Experience>
          </Route>
          <Route path="/skills">
            <Skills redraw={redrawSkillsTime}></Skills>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </Layout>     
    </Layout>
  </Router>
)};

export default App;
