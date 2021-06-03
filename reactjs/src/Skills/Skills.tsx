import React from 'react';
import styles from './Skills.module.scss';
import skills from '../Shared/skills-data';
import SkillNode from './SkillNode/SkillNode';

const Skills: React.FC = () => (
  <div className={styles.Skills}>
    <SkillNode></SkillNode>
  </div>
);

export default Skills;
