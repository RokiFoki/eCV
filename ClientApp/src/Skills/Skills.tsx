import { PageHeader, Radio } from 'antd';
import React, { useState } from 'react';
import ProjectList from '../Projects/ProjectList/ProjectList.lazy';
import SkillList from './SkillList/SkillList.lazy';
import styles from './Skills.module.scss';
import SkillTree from './SkillTree/SkillTree.lazy';
import SkillTree3D from './SkillTree3D/SkillTree3D';
import projects from '../Shared/projects-data';

//console.log([...new Set(([] as string[]).concat(...projects.map(p => p.tech.map(t => t.name))))].sort());

const Skills: React.FC<ISkillsProps> = (props: ISkillsProps) => {
  const [skillsView, updateSkillsView] = useState<'list' | 'tree' | '3dtree'>('list');
  const [tags, setTags] = useState<string[]>([]);

  const filteredProjects = projects.filter(p => !tags.length || p.tech.some(t => tags.includes(t.name)));
  return <div className={styles.Skills}>    
      <PageHeader title="Skills" className='page-title' />
      <div>
        <label style={{marginRight: 10}}>
          Skills view:
        </label>
        <Radio.Group value={skillsView} onChange={(e) => updateSkillsView(e.target.value)}>
          <Radio.Button value="list">List</Radio.Button>
          <Radio.Button value="tree">Tree</Radio.Button>
          <Radio.Button value="3dtree">3D tree</Radio.Button>
        </Radio.Group>
      </div>

      <div className={styles.SkillsDataContainer}>
          {skillsView === 'list' && <SkillList setTags={setTags}></SkillList>}
          {skillsView === 'tree' && <SkillTree setTags={setTags}></SkillTree>}
          {skillsView === '3dtree' && <SkillTree3D setTags={setTags} {...props}></SkillTree3D>}
        <div style={{flex: 1}}>
          <ProjectList projects={filteredProjects}></ProjectList>
        </div>
      </div>
    </div>;
}

export default Skills;

export interface ISkillsProps {
  redraw: number;
}
