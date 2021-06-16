import { Progress } from 'antd';
import React, { useRef } from 'react';
import styles from './SkillNode.module.scss';

const red = 'rgb(204, 0, 0)';
const orange = 'rgb(255, 153, 51)';
const lightGreen = 'rgb(204, 255, 51)';
const green = 'rgb(51, 204, 51)';

const SkillNode: React.FC<SkillNodeProps> = (props) => {
  return (
  <span className={`${styles.SkillNode} ${props.class && styles[props.class]}`}>
    <button className={`${styles.pushable} ${props.class && styles[props.class]}`} 
        onClick={props.onClick} ref={props.nodeButtonRef}
      >
      <span className={`${styles.shadow} ${props.class && styles[props.class]}`}></span>
      <span className={`${styles.edge} ${props.class && styles[props.class]}`}></span>
      <span className={`${styles.front} ${props.class && styles[props.class]}`}>
        <div style={{minWidth: 40}}>
          {props.name}
        </div>
        <div style={{width: '100%', lineHeight: '1em', marginTop: -4 }}>
          <Progress percent={props.experience} showInfo={false} 
            strokeColor={ props.experience >= 90 ? green :
                          props.experience >= 75 ? lightGreen :
                          props.experience >= 50 ? orange :red } 
            strokeWidth={5}/>
        </div>
      </span>
    </button>
  </span>
)};

interface SkillNodeProps {
  name: string;
  onClick?: () => void;
  class?: 'selected' | 'has-children' | '';
  experience: number;
  nodeButtonRef: (el: HTMLButtonElement) => void;
}

export default React.memo(SkillNode);


