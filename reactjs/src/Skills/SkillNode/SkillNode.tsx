import React from 'react';
import styles from './SkillNode.module.scss';

const SkillNode: React.FC = () => (
  <div className={styles.SkillNode}>
    <button className={styles.pushable}>
      <span className={styles.front}>
        Push me
      </span>
    </button>
  </div>
);

export default SkillNode;
