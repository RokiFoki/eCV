import React, { useEffect, useRef, useState } from 'react';
import styles from './SkillTree.module.scss';
import skills, { ISkill } from '../../Shared/skills-data';
import SkillNode from './SkillNode/SkillNode';
import { PageHeader, Space } from 'antd';

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
  if (!nodes.some(node => node.selected)) {
    const nodeToExpand = nodes.find(nodes => nodes.children.length > 0);
    if (nodeToExpand) nodeToExpand.selected = true;
  };

  return nodes.find(node => node.selected)?.children;
}

const skillNodes = skills as ISkillNode[];
const nodesLevels = [...levelGenerator(skillNodes)];
let shownNodes = nodesLevels.flat();
const SkillTree = (props: SkillTreeProps): JSX.Element => {
  const [nodes, updateNodes] = useState(nodesLevels);
  const [svgCords, updateSvgCords] = useState<{[key: string]: {x: number, y: number, width: number, height: number}}>({});
  const [redraw, updateRedraw] = useState(+new Date())
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    for (let i = 100; i <= animationTimeMs+100; i+= 100)
      setTimeout(() => {
        updateRedraw(+new Date());
      }, i);   
  }, [props.redraw])

  function updateSelection(skill: ISkillNode) {
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
    updateSelection(skill);
    const nodesLevels = [...levelGenerator(skillNodes)];
    shownNodes = nodesLevels.flat();
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
    <div className={styles.SkillTree}>
      <PageHeader title="Skill" className='page-title' />
      <svg className={styles.svgContainer} ref={svgRef}>
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
      <div style={{display: 'inline-flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'stretch', minWidth: 'auto'}}>
        {nodes.map(nodesRow => (
          <Space size="middle" key={nodesRow[0].level} style={{marginBottom: 50, display: 'inline-flex', justifyContent: 'center'}}>
            {nodesRow.map(node => (
              <SkillNode
                onClick={() => selectNode(node)}
                name={node.name} 
                key={node.name}
                class={node.selected ? 'selected' : node.children.length > 0 ? 'has-children' : ''}
                experience={node.experience}
                nodeButtonRef={(el) => { handleNodeRef(node.name, el) }}
                redraw={redraw}
                ></SkillNode>))}
          </Space>
        ))}
      </div>
    </div>
  )
};

interface ISkillNode extends ISkill {
  selected?: boolean;
  children: ISkillNode[];
}

export default SkillTree;

export interface SkillTreeProps {
  redraw: number;
}