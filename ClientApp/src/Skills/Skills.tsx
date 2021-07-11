import { PageHeader, Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import ProjectList from '../Projects/ProjectList/ProjectList';
import SkillList from './SkillList/SkillList';
import styles from './Skills.module.scss';
import SkillTree from './SkillTree/SkillTree.lazy';
import SkillTree3D from './SkillTree3D/SkillTree3D.lazy';
import projects from '../Shared/projects-data';

const Skills: React.FC<ISkillsProps> = (props: ISkillsProps) => {
  const [skillsView, updateSkillsView] = useState<'list' | 'tree' | '3dtree'>('list');
  const [tags, setTags] = useState<string[]>([]);

  const filteredProjects = projects.filter(p => {
    if (tags.length) {
      return p.tech.some(t => tags.includes(t.name));
    }

    return !p.hideWithAll;
  });

  const onSkillViewChange = (e: RadioChangeEvent) => {
    updateSkillsView(e.target.value);
    setTags([]);
  }
  return <div className={styles.Skills}>    
      <PageHeader title="Skills" className='page-title' />
      <div>
        <label style={{marginRight: 10}}>
          Skills view:
        </label>
        <Radio.Group value={skillsView} onChange={onSkillViewChange}>
          <Radio.Button value="list">List</Radio.Button>
          <Radio.Button value="tree">Tree</Radio.Button>
          <Radio.Button value="3dtree">3D tree</Radio.Button>
        </Radio.Group>
      </div>

      <div className={styles.SkillsDataContainer}>
          {skillsView === 'list' && <SkillList setTags={setTags}></SkillList>}
          {skillsView === 'tree' && <SkillTree setTags={setTags}></SkillTree>}
          {skillsView === '3dtree' && <SkillTree3D setTags={setTags} {...props}></SkillTree3D>}
        <div style={{flex: 1, maxWidth: '100%'}}>
          <ProjectList projects={filteredProjects}></ProjectList>
        </div>
      </div>
    </div>;
}

export default Skills;

export interface ISkillsProps {
  redraw: number;
}
