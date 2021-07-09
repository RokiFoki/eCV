import { Avatar, Checkbox, List } from 'antd';
import React from 'react';
import styles from './SkillList.module.scss';
import skillData, { ISkill } from '../../Shared/skills-data';

function *treeToList(nodes: ISkill[]): Generator<ISkill> {
  for (const n of nodes) {
    yield n;
    for (const e of [...treeToList(n.children)]) {
      yield e;
    }
  }
}
const data = [...treeToList(skillData)].filter(d => !d.children?.length);

const SkillList: React.FC<ISkillListProps> = ({setTags}: ISkillListProps) => {
  
  return (
  <div className={styles.SkillList}>
    <Checkbox.Group onChange={(tags) => setTags(tags as string[])}>
    <List
      size="small"
      dataSource={data}
      renderItem={item => 
        <List.Item>
          <Checkbox value={item.key}>{!!item.url && <Avatar src={item.url} style={{marginRight: 5}} size={24} /> }{item.name}</Checkbox>
        </List.Item>
    }
    /></Checkbox.Group>
  </div>
)};

export default SkillList;

export interface ISkillListProps {
  setTags: (tags: string[]) => void;
}
