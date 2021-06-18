import { Progress } from 'antd';
import React, { useRef } from 'react';
import styles from './SkillNode.module.scss';

const red = 'rgb(204, 0, 0)';
const orange = 'rgb(255, 153, 51)';
const lightGreen = 'rgb(204, 255, 51)';
const green = 'rgb(51, 204, 51)';

class SkillNode extends React.Component<SkillNodeProps> 
{
  constructor(props: SkillNodeProps) {
    super(props);
  }

  render() {
    return (
    <span className={`${styles.SkillNode} ${this.props.class && styles[this.props.class]}`}>
      <button className={`${styles.pushable} ${this.props.class && styles[this.props.class]}`} 
          onClick={this.props.onClick} ref={this.props.nodeButtonRef}
        >
        <span className={`${styles.shadow} ${this.props.class && styles[this.props.class]}`}></span>
        <span className={`${styles.edge} ${this.props.class && styles[this.props.class]}`}></span>
        <span className={`${styles.front} ${this.props.class && styles[this.props.class]}`}>
          <div style={{minWidth: 40}}>
            {this.props.name}
          </div>
          <div style={{width: '100%', lineHeight: '1em', marginTop: -4 }}>
            <Progress percent={this.props.experience} showInfo={false} 
              strokeColor={ this.props.experience >= 90 ? green :
                            this.props.experience >= 75 ? lightGreen :
                            this.props.experience >= 50 ? orange :red } 
              strokeWidth={5}/>
          </div>
        </span>
      </button>
    </span>)
  }

  shouldComponentUpdate(nextProps: SkillNodeProps, nextState: any) {
    return nextProps.redraw !== this.props.redraw;
  }
}

interface SkillNodeProps {
  name: string;
  onClick?: () => void;
  class?: 'selected' | 'has-children' | '';
  experience: number;
  nodeButtonRef: (el: HTMLButtonElement) => void;
  redraw: number;
}

export default React.memo(SkillNode);


