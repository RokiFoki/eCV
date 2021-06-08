import React, { useRef } from 'react';
import styles from './SkillNode.module.scss';


const SkillNode: React.FC<SkillNodeProps> = (props) => {
  return (
  <span className={`${styles.SkillNode} ${props.class && styles[props.class]}`}>
    <button className={`${styles.pushable} ${props.class && styles[props.class]}`} 
        onClick={props.onClick} ref={props.nodeButtonRef}
      >
      <span className={`${styles.shadow} ${props.class && styles[props.class]}`}></span>
      <span className={`${styles.edge} ${props.class && styles[props.class]}`}></span>
      <span className={`${styles.front} ${props.class && styles[props.class]}`}>
        {props.name}
      </span>
    </button>
  </span>
)};

interface SkillNodeProps {
  name: string;
  onClick?: () => void;
  class?: 'selected' | 'has-children' | '';
  nodeButtonRef: (el: HTMLButtonElement) => void;
}

export default React.memo(SkillNode);


