import React from 'react';
import Project, {IProjectProps} from './Project/Project';
import styles from './ProjectList.module.scss';

const ProjectList: React.FC<IProjectListProps> = ({projects}: IProjectListProps) => (
  <div className={styles.ProjectList}>
      {projects.map(p => (<Project 
          key={p.title}
          {...p}
        ></Project>)
      )}
  </div>
);

export default ProjectList;

export interface IProjectListProps {
  projects: IProjectProps[];
}
