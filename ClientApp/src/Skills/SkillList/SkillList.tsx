import { Checkbox, List } from 'antd';
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

const SkillList = () => {
  
  return (
  <div className={styles.SkillList}>
    <List
      size="small"
      dataSource={data}
      renderItem={item => 
        <List.Item>
          <Checkbox value={item.name}>{item.name}</Checkbox> 
        </List.Item>
    }
    />
  </div>
)};

export default SkillList;
