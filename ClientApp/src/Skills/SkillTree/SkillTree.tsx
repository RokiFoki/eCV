import { Tree } from 'antd';
import React, { useState } from 'react';
import styles from './SkillTree.module.scss';
import skills, { ISkill } from '../../Shared/skills-data';

interface ITreeData {
  title: string;
  key: string; 
  children: ITreeData[];
}

function toTreeNode(skill: ISkill): ITreeData {
  return {
    title: skill.name,
    key: skill.name,
    children: skill.children.map(c => toTreeNode(c))
  }
}

const treeData = skills.map(s => toTreeNode(s));

const SkillTree: React.FC<ISkillTreeProps> = ({setTags}: ISkillTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(treeData.map(d => d.key));
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(treeData.map(d => d.key));
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    //console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[]; }) => {
    //console.log('onCheck', checkedKeysValue);
    if (Array.isArray(checkedKeysValue))
      setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    //console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
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
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </div>
  );
};

export default SkillTree;

export interface ISkillTreeProps {
  setTags: (tags: string[]) => void;
}
