import React, { useEffect, useRef, useState } from 'react';
import styles from './SkillTree3D.module.scss';
import { ISkill, skillsTree as skills } from '../../Shared/skills-data';
import SkillNode from './SkillNode/SkillNode';
import { Space } from 'antd';
import { deepCopy } from '../../Shared/utils';

const animationTimeMs = 400;
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

  for (nodes_iterator=nextLevel(nodes_iterator); nodes_iterator && nodes_iterator.length > 0; nodes_iterator=nextLevel(nodes_iterator)) {
    yield nodes_iterator;
  }
}

function nextLevel(nodes: ISkillNode[]) {
  if (nodes.length === 0) return undefined;
  if (!nodes.some(node => node.expanded)) {
    const nodeToExpand = nodes.find(nodes => nodes.children.length > 0);
    if (nodeToExpand) nodeToExpand.expanded = true;
  };

  return nodes.find(node => node.expanded)?.children;
}

function expandParentsOf(nodesKey: string, nodes: ISkillNode[]) {
  for (let n of nodes) {
    if (nodesKey === n.key) {
      n.expanded = true;
      return true;
    }

    const itsChild = expandParentsOf(nodesKey, n.children);
    if (itsChild) {
      n.expanded = true;
      return true;
    }
  }

  return false;
}

let shownNodes: ISkillNode[] = [];
let skillNodes: ISkillNode[] = [];
const SkillTree3D = ({redraw, setTags, tags}: SkillTree3DProps): JSX.Element => {
  const [nodes, updateNodes] = useState<ISkillNode[][]>([]);
  const [selectedNode, updateSelectedNode] = useState<string>('')
  const [svgCords, updateSvgCords] = useState<{[key: string]: {x: number, y: number, width: number, height: number}}>({});
  const [redrawState, updateRedraw] = useState(+new Date())
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    skillNodes = deepCopy(skills.filter(s => !s.hideInTree)) as ISkillNode[];
    if (tags.length > 0) {
      const selectedNode = tags[0];
      expandParentsOf(selectedNode, skillNodes);
      updateSelectedNode(selectedNode);
    } else {
      updateSelectedNode(skills[0].key)
    }
    
    const nodesLevels = [...levelGenerator(skillNodes)];
    shownNodes = nodesLevels.flat();

    updateNodes(nodesLevels);
    if (!tags.length) {
      setTags(shownNodes.filter(n => n.level > nodesLevels[0][0].level || n.name === nodesLevels[0][0].name).map(n => n.key));
    }
  // should be called only on mount thus following:
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  useEffect(() => {
    for (let i = 100; i <= animationTimeMs+100; i+= 100)
      setTimeout(() => {
        updateRedraw(+new Date());
      }, i);   
  }, [redraw])

  function updateExpansion(skill: ISkillNode) {
    for (const nodeRow of nodes) {
      for (const node of nodeRow) {
        if (node === skill) {
            nodeRow.forEach(n => n.expanded = false);
            node.expanded = true;
            return;
        }
      }
    }
  }

  function selectNode(skill: ISkillNode) {
    updateExpansion(skill);
    updateSelectedNode(skill.key);
    const nodesLevels = [...levelGenerator(skillNodes)];
    shownNodes = nodesLevels.flat();
    setTags(shownNodes.filter(n => n.level > skill.level || n.name === skill.name).map(n => n.key));
    updateNodes(nodesLevels);
    updateRedraw(+new Date());
  }

  function handleNodeRef(name: string, el: HTMLButtonElement | null) {
    if (el) {
      const rect = el.getBoundingClientRect();
      const svgRect = svgRef.current?.getBoundingClientRect();
      const oldCords = svgCords[name];
      svgCords[name] = { 
        x: rect.x - (svgRect?.x || 0), 
        y: rect.y - (svgRect?.y || 0), 
        width: rect.width, 
        height: rect.height
      };

      if (JSON.stringify(oldCords) !== JSON.stringify(svgCords[name])) {
        updateSvgCords({...svgCords});
      }
    } else {
      if (svgCords[name]) {
        if (!shownNodes.some(node => node.name === name)) {
          delete svgCords[name];
          updateSvgCords({...svgCords});
        }
      }
    }
  }

  return (
    <div className={styles.SkillTree3D}>
      <div className={styles.NodesContainer}>
        <svg className={styles.SvgContainer} ref={svgRef}>
          {
            nodes.map(nodesRow => 
              nodesRow.filter(p => shownNodes.some(node => node.name === p.name)).map(parent =>
                parent.children.filter(c => shownNodes.some(node => node.name === c.name)).map(child => {
                  const parentBox = svgCords[parent.name];
                  const childBox = svgCords[child.name];

                  return parentBox && childBox && (<line style={{stroke:'gray', strokeWidth:2}}
                    key={`${parent.name};${child.name}`}
                    x1={parentBox.x + parentBox.width/2} 
                    y1={parentBox.y + parentBox.height + 3}
                    x2={childBox.x + childBox.width/2}
                    y2={childBox.y} />)
                })
            ))
          }
        </svg>
        
        {nodes.map(nodesRow => (
          <Space size="middle" key={nodesRow[0].level} style={{marginBottom: 50, display: 'inline-flex', justifyContent: 'center'}}>
            {nodesRow.map(node => (
              <SkillNode
                onClick={() => selectNode(node)}
                name={node.name} 
                key={node.name}
                class={selectedNode === node.key ? 'selected' : node.expanded ? 'expanded' : node.children.length > 0 ? 'has-children' : ''}
                experience={node.experience}
                nodeButtonRef={(el) => { handleNodeRef(node.name, el) }}
                redraw={redrawState}
                ></SkillNode>))}
          </Space>
        ))}
      </div>
    </div>
  )
};

interface ISkillNode extends ISkill {
  expanded?: boolean;
  children: ISkillNode[];
}

export default SkillTree3D;

export interface SkillTree3DProps {
  redraw: number;
  setTags: (tags: string[]) => void;
  tags: string[];
}