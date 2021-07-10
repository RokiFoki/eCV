import { Card, List, Modal, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import styles from './Projects.module.scss';
import projects from '../Shared/projects-data';
import Project from './ProjectList/Project/Project';
import ProjectList from './ProjectList/ProjectList';

const Projects = () => {
  const projectsToDisplay = projects.filter(p => !p.hideWithAll);

  return (
  <div className={styles.Projects}>
    <ProjectList projects={projectsToDisplay}></ProjectList>
  </div>
)};

export default Projects;
