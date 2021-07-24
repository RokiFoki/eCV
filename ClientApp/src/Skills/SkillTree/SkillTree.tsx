import { Progress, Tree } from 'antd';
import React, { useState } from 'react';
import styles from './SkillTree.module.scss';
import skills, { ISkill } from '../../Shared/skills-data';

interface ITreeData {
  title: string | JSX.Element;
  key: string; 
  children: ITreeData[];
}

const orange = 'rgb(255, 153, 51)';
const yellow = 'hsl(60, 100%, 50%)';
const lightGreen = 'rgb(204, 255, 51)';
const green = 'rgb(51, 204, 51)';

function toTreeNode(skill: ISkill): ITreeData {
  return {
    title: (
    <>
      <div>{skill.name}</div>
      <div style={{width: 80, margin: '-8px 0 -5px 0'}}>
              <Progress percent={skill.experience} showInfo={false} 
                strokeColor={ skill.experience >= 90 ? green :
                              skill.experience >= 75 ? lightGreen :
                              skill.experience >= 50 ? yellow : orange } 
                strokeWidth={5}/>
              </div>
    </>),
    key: skill.key,
    children: skill.children.map(c => toTreeNode(c))
  }
}

const treeData = skills.filter(s => !s.hideInTree).map(s => toTreeNode(s));

const SkillTree: React.FC<ISkillTreeProps> = ({setTags}: ISkillTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(treeData.map(d => d.key));
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(treeData.map(d => d.key));
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    //console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[]; }) => {
    if (Array.isArray(checkedKeysValue)) {
      setCheckedKeys(checkedKeysValue as React.Key[]);
      setTags(checkedKeysValue as string[]);
    }
  };

  return (
    <div className={styles.SkillTree}>
      <Tree
        className={styles.AntTree}
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
      />
    </div>
  );
};

export default SkillTree;

export interface ISkillTreeProps {
  setTags: (tags: string[]) => void;
}
