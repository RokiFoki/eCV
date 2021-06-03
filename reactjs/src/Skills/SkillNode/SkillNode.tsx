import React from 'react';
import styles from './SkillNode.module.scss';

const SkillNode: React.FC = () => (
  <div className={styles.SkillNode}>
    <button className="pushable">
      <span className="front">
        Push me
      </span>
    </button>
  </div>
);

export default SkillNode;
