import { Card, List, Modal, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import styles from './Projects.module.scss';
import droneImg from '../Content/drone-diagram.png';

const tech: {name: string, description: string}[] = [
  {name: '.NET', description: 'Used for server backend.'}, 
  {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.'},
  {name: 'WebGL', description: `Used to display drone's positon in relation to detected obstacles. `}, 
  {name: 'SQL Server', description: 'Database used for the project.'}, 
  {name: 'jQuery', description: 'Used to make the browser interactive.'},
  {name: 'Bootstrap', description: 'UI library used for the project.'},
  {name: 'RaspberryPi', description: 'Little compter that acted as the brain between sensors, movement logic and Android device.'},
  {name: 'Python', description: 'Scripting lanague used for movement AI.'},
  {name: 'DroneKit.', description: 'Python library to control drone.'},
  {name: 'Android/Java', description: 'Used to implement network measurement tests.'}, 
]

const title = 'Self flying drone for network performance measurements';

const Projects = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
  <div className={styles.Projects}>
    <Tooltip title={title}>
      <Card title={title} 
        className={`${styles.Project} ${!expanded ? styles.NotExpanded: ''}`} 
        bordered={false} onClick={() => setExpanded(!expanded)}>
        {expanded && <Tooltip placement="bottom" title="Click for full screen">
          <img src={droneImg} className={styles.ProjectImage} alt="Drone Diagram" onClick={showModal}></img>
        </Tooltip>}
        <Typography>
          <Typography.Paragraph ellipsis={{rows: 3, expandable: false }}>The project involved a drone that is self-controlled, holding an Android device that measures network bandwidth. The position, status, and network bandwidth are displayed in real-time on a web application where users can send basic commands to the drone. The drone has sensors on it making it able to avoid obstacles on the given path.</Typography.Paragraph>
          {expanded && <Typography.Paragraph>I worked on the development of the AI for drone movement, real-time communication with the server, server with real-time information about the drone’s position and status. Assisted in developing measurement tests for the Android device that the drone was holding. </Typography.Paragraph>}
        </Typography>
        
        {expanded && <div className="full-width" style={{clear: 'both'}}>
          <b>Technology:</b>
          <ul>
            <List
              size="small"
              dataSource={tech}
              renderItem={item => 
              <List.Item key={item.name}>
                <List.Item.Meta title={item.name} description={item.description} />
              </List.Item>}
            />
          </ul>  
        </div>}
        {!expanded && <p><strong>Technology:</strong> {tech.map(t => t.name).join(', ')}</p>}
        <p><strong>Buzzwords:</strong> IOT, AI, ML</p>
      </Card>
    </Tooltip>
    <Modal title={null} visible={isModalVisible} footer={null} onCancel={hideModal} width={650+50}>
      <div style={{overflow: 'auto'}}>
        <img src={droneImg} style={{maxWidth: '650px', marginTop: '30px'}} alt="Drone Diagram"></img>
      </div>
    </Modal>
  </div>
)};

export default Projects;
