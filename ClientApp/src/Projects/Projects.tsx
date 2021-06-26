import { Card, List, Modal, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import styles from './Projects.module.scss';
import projects from '../Shared/projects-data';



const Projects = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const showModal = (event: React.MouseEvent<HTMLElement>) => {
    setIsModalVisible(true);
    event.stopPropagation();
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
  <div className={styles.Projects}>
    {projects.map(p => 
    (
    <React.Fragment key={p.title}>
      <Tooltip title={expanded ? null : p.title}>
        <Card title={p.title} 
          className={`${styles.Project} ${!expanded ? styles.NotExpanded: ''}`} 
          bordered={false} onClick={() => setExpanded(!expanded)}>
          {expanded && !!p.img && <Tooltip placement="bottom" title="Click for full screen">
            <img src={p.img?.source} className={styles.ProjectImage} alt={p.img?.alt} onClick={showModal}></img>
          </Tooltip>}
          <Typography>
            <Typography.Paragraph ellipsis={{rows: 3, expandable: false }}>{p.paragraphs[0]}</Typography.Paragraph>
            {expanded && p.paragraphs.length > 1 && p.paragraphs.slice(1).map((par, i) => 
              (<Typography.Paragraph key={i}>{par}</Typography.Paragraph>))}
          </Typography>
          
          {expanded && <div className="full-width" style={{clear: 'both'}}>
            <b>Technology:</b>
            <ul>
              <List
                size="small"
                dataSource={p.tech}
                renderItem={item => 
                <List.Item key={item.name}>
                  <List.Item.Meta title={item.name} description={item.description} />
                </List.Item>}
              />
            </ul>  
          </div>}
          {!expanded && <p><strong>Technology:</strong> {p.tech.map(t => t.name).join(', ')}</p>}
          <p><strong>Buzzwords:</strong> {p.buzzwords.join(', ')}</p>
        </Card>
      </Tooltip>
      {!!p.img && <Modal title={null} visible={isModalVisible} footer={null} onCancel={hideModal} width={p.img?.width+50}>
        <div style={{overflow: 'auto'}}>
          <img src={p.img?.source} style={{maxWidth: p.img?.width, marginTop: '30px'}} alt={p.img?.alt}></img>
        </div>
      </Modal>}
    </React.Fragment>)
    )}
  </div>
)};

export default Projects;
