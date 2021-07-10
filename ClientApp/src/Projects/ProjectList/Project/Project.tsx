import { Avatar, Card, List, Modal, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import styles from './Project.module.scss';

const Project: React.FC<IProjectProps> = ({title, paragraphs, tech, img, buzzwords}: IProjectProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const showModal = (event: React.MouseEvent<HTMLElement>) => {
    setIsModalVisible(true);
    event.stopPropagation();
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const techImages = tech.map(t => t.img ? [t.img] : t.imgs).flat().filter(i => !!i);
  return (
    <React.Fragment key={title}>
      <Tooltip title={expanded ? null : title}>
        <Card title={title} 
          className={`${styles.Project} ${!expanded ? styles.NotExpanded: ''}`} 
          bordered={false} onClick={() => setExpanded(!expanded)}>
          {expanded && !!img && <Tooltip placement="bottom" title="Click for full screen">
          <div className={styles.ImageWrapper}>
            <img src={img?.source} className={styles.ProjectImage} alt={img?.alt} onClick={showModal}></img>
          </div>
          </Tooltip>}
          <Typography>
            <Typography.Paragraph ellipsis={!expanded && {rows: 3, expandable: false }} className={styles.FirstParagraph}>
              {paragraphs[0]}
            </Typography.Paragraph>
            {expanded && paragraphs.length > 1 && paragraphs.slice(1).map((par, i) => 
              (<Typography.Paragraph key={i}>{par}</Typography.Paragraph>))}
          </Typography>
          
          {expanded && <div className="full-width" style={{clear: 'both'}}>
            <b>Technology:</b>
            <ul>
              <List
                size="small"
                dataSource={tech}
                renderItem={item => 
                <List.Item key={item.name}>
                  <List.Item.Meta 
                    avatar={item.img ? <Avatar size={42} src={item.img} /> : 
                            item.imgs ? <Avatar.Group>
                              {item.imgs.map(i => <Avatar size={30} src={i} key={i}/>)}
                            </Avatar.Group> : null}
                    title={item.name} 
                    description={item.description} />
                </List.Item>}
              />
            </ul>  
          </div>}
          {!expanded && <p><strong>Technology:</strong> {tech.map(t => t.name).join(', ')}</p>}
          {!expanded && !!techImages?.length && 
            <Avatar.Group maxCount={10}>
              {techImages.map(i =>
                <Avatar size={30} src={i} key={i}/>
              )}
            </Avatar.Group>}
          {!!buzzwords.length && <p><strong>Buzzwords:</strong> {buzzwords.join(', ')}</p>}
        </Card>
      </Tooltip>
      {!!img && <Modal title={null} visible={isModalVisible} footer={null} onCancel={hideModal} width={img?.width+50}>
        <div style={{overflow: 'auto'}}>
          <img src={img?.source} style={{maxWidth: img?.width, marginTop: '30px'}} alt={img?.alt}></img>
        </div>
      </Modal>}
    </React.Fragment>
  );
}

type ProjectParagraph = string | JSX.Element;

interface ITech {
  name: string;
  description: string;
  img?: string;
  imgs?: string[];
}

export interface IProjectProps {
  title: string;
  img?: {source: string, alt: string, width: number},
  paragraphs: { 0: ProjectParagraph } & ProjectParagraph[],
  tech: ITech[],
  buzzwords: string[],
  /**
   * when true, will not be shown unless its triggered with the filters
   */
  hideWithAll?: boolean
}

export default Project;
