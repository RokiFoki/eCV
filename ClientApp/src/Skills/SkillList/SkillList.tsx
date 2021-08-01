import { Avatar, Checkbox, List, Progress } from 'antd';
import React from 'react';
import styles from './SkillList.module.scss';
import { skillsList } from '../../Shared/skills-data';


const data = skillsList.filter(d => !d.children?.length);

const orange = 'rgb(255, 153, 51)';
const yellow = 'hsl(60, 100%, 50%)';
const lightGreen = 'rgb(204, 255, 51)';
const green = 'rgb(51, 204, 51)';

const SkillList: React.FC<ISkillListProps> = ({setTags, tags}: ISkillListProps) => {  
  return (
  <div className={styles.SkillList}>
    <Checkbox.Group onChange={(tags) => setTags(tags as string[])} defaultValue={tags}>
    <List
      size="small"
      dataSource={data}
      renderItem={item => 
        <List.Item>
          <Checkbox value={item.key}>
              <div>
                {!!item.url && <Avatar src={item.url} style={{marginRight: 5}} size={24} /> }{item.name}
              </div>
              <div style={{width: 100, margin: '-8px 0 -5px 0'}}>
              <Progress percent={item.experience} showInfo={false} 
                strokeColor={ item.experience >= 90 ? green :
                              item.experience >= 75 ? lightGreen :
                              item.experience >= 50 ? yellow : orange } 
                strokeWidth={5}/>
              </div>
          </Checkbox>
        </List.Item>
    }
    /></Checkbox.Group>
  </div>
)};

export default SkillList;

export interface ISkillListProps {
  setTags: (tags: string[]) => void;
  tags: string[]
}
