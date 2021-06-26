import { Card, List, Modal, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import styles from './Projects.module.scss';
import projects from '../Shared/projects-data';
import Project from './Project/Project';

const Projects = () => {
  return (
  <div className={styles.Projects}>
    <div className={styles.Container}>
      {projects.map(p => (<Project 
          key={p.title}
          {...p}
        ></Project>)
      )}
    </div>
  </div>
)};

export default Projects;
