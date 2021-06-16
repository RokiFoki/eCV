import React, { useRef, useState } from 'react';
import styles from './Skills.module.scss';
import skills, { ISkill } from '../Shared/skills-data';
import SkillNode from './SkillNode/SkillNode';
import { PageHeader, Space } from 'antd';

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
const nodesLevels = [...levelGenerator(skillNodes)];
let shownNodes = nodesLevels.flat();
const Skills: React.FC = () => {
  const [nodes, updateNodes] = useState(nodesLevels);
  const [svgCords, updateSvgCords] = useState<{[key: string]: {x: number, y: number, width: number, height: number}}>({});
  const svgRef = useRef<SVGSVGElement>(null);

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
  }

  function handleNodeRef(name: string, el: HTMLButtonElement | null) {
    if (el) {
      //console.log('adding ', name);
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
        //console.log('svgCords', svgCords);
        updateSvgCords({...svgCords});
      }
    } else {
      //console.log('trying to delete:', name);
      if (svgCords[name]) {
        //console.log('its in the svgcords');
        //if (!nodes.some(nodesRow => !nodesRow.some(n => n.name === name))) {
        if (!shownNodes.some(node => node.name === name)) {
          //console.log('its in the shownNodes - deleting', name);
          delete svgCords[name];
          updateSvgCords({...svgCords});
          //console.log('svgCords', svgCords);
        } else {
          //console.log(shownNodes);
        }
      }
    }
  }

  return (
    <div className={styles.Skills}>
      <PageHeader title="Skills" className={styles.title} />
      <svg className={styles.svgContainer} ref={svgRef}>
        {/* {Object.keys(svgCords).map(name => { 
          const cord = svgCords[name];
          return (<rect x={cord.x} y={cord.y} width={cord.width} height={cord.height} key={name} 
                        style={{ stroke: "rgb(255,255,255)", strokeWidth: 2 }} />)
        })} */}
        {
          nodes.map(nodesRow => 
            nodesRow.map(parent =>
              parent.children.map(child => {
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
        <div key={nodesRow[0].level} style={{marginBottom: 50}}>
          <Space size="middle">
            {nodesRow.map(node => (
              <SkillNode
                onClick={() => selectNode(node)}
                name={node.name} 
                key={node.name}
                class={node.selected ? 'selected' : node.children.length > 0 ? 'has-children' : ''}
                experience={node.experience}
                nodeButtonRef={(el) => { handleNodeRef(node.name, el) }}
                ></SkillNode>))}
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
