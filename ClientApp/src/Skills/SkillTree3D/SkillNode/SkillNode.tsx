import { Progress } from 'antd';
import React from 'react';
import styles from './SkillNode.module.scss';

const orange = 'rgb(255, 153, 51)';
const yellow = 'hsl(60, 100%, 50%)';
const lightGreen = 'rgb(204, 255, 51)';
const green = 'rgb(51, 204, 51)';

class SkillNode extends React.Component<SkillNodeProps> 
{
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
                            this.props.experience >= 50 ? yellow : orange } 
              strokeWidth={5}/>
          </div>
        </span>
      </button>
    </span>)
  }

  shouldComponentUpdate(nextProps: SkillNodeProps, nextState: any) {
    return nextProps.redraw !== this.props.redraw || 
      nextProps.class !== this.props.class;
  }
}

interface SkillNodeProps {
  name: string;
  onClick?: () => void;
  class?: 'selected' | 'expanded' | 'has-children' | '';
  experience: number;
  nodeButtonRef: (el: HTMLButtonElement) => void;
  redraw: number;
}

export default React.memo(SkillNode);


