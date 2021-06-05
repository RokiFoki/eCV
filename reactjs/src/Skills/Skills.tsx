import React, { useState } from 'react';
import styles from './Skills.module.scss';
import skills, { ISkill } from '../Shared/skills-data';
import SkillNode from './SkillNode/SkillNode';
import { Select, Space } from 'antd';

function* levelGenerator(nodes: ISkillNode[]) {
  let nodes_iterator: ISkillNode[] | undefined = nodes;

  const minLevel = nodes_iterator.map(node => node.level).reduce((n1, min) => n1 > min ? min : n1, 999999);
  if (!nodes_iterator.every(node => node.level === minLevel)) {
    yield nodes_iterator.filter(node => node.level === minLevel);
      
    const nextLevelNodes = (nextLevel(nodes_iterator.filter(node => node.level === minLevel)) || []).concat(nodes_iterator.filter(node => node.level !== minLevel));
    if (nextLevelNodes?.length) {
      yield nextLevelNodes;
    }
    
    nodes_iterator = nextLevelNodes
  } else {
    yield nodes_iterator;
  }

  while(nodes_iterator = nextLevel(nodes_iterator)) {
    if (nodes_iterator.length > 0) {
      yield nodes_iterator; 
    } else {
      break;
    }
  }
}

function nextLevel(nodes: ISkillNode[]) {
  if (nodes.length === 0) return undefined;
  if (!nodes.some(node => node.selected)) {
    const nodeToExpand = nodes.find(nodes => nodes.children.length > 0);
    if (nodeToExpand) nodeToExpand.selected = true;
  };

  return nodes.find(node => node.selected)?.children;
}

const skillNodes = skills as ISkillNode[];

const Skills: React.FC = () => {
  const [nodes, updateNodes] = useState([...levelGenerator(skillNodes)]);

  function clearSelection(skill: ISkillNode) {
    for (const nodeRow of nodes) {
      for (const node of nodeRow) {
        if (node === skill) {
            nodeRow.forEach(n => n.selected = false);
            node.selected = true;
            return;
        }
      }
    }
  }

  function selectNode(skill: ISkillNode) {
    clearSelection(skill);
    updateNodes([...levelGenerator(skillNodes)]);
  }

  return (
    <div className={styles.Skills}>
      {nodes.map(nodesRow => (
        <div key={nodesRow[0].level} style={{marginBottom: 50}}>
          <Space size="middle">
            {nodesRow.map(node => (
            <SkillNode
              onClick={() => selectNode(node)}
              name={node.name} 
              key={node.name}
              class={node.selected ? 'selected' : node.children.length > 0 ? 'has-children' : ''}></SkillNode>))}
          </Space>
      </div>))}
    </div>
  )
};

interface ISkillNode extends ISkill {
  selected?: boolean;
  children: ISkillNode[];
}

export default Skills;
