import { PageHeader, Radio } from 'antd';
import React, { useState } from 'react';
import SkillList from './SkillList/SkillList.lazy';
import styles from './Skills.module.scss';
import SkillTree from './SkillTree/SkillTree.lazy';
import SkillTree3D, { SkillTree3DProps } from './SkillTree3D/SkillTree3D';

const Skills = (props: SkillTree3DProps) => {
  const [skillsView, updateSkillsView] = useState<'list' | 'tree' | '3dtree'>('list');

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
        <>
          {skillsView === 'list' && <SkillList></SkillList>}
          {skillsView === 'tree' && <SkillTree></SkillTree>}
          {skillsView === '3dtree' && <SkillTree3D {...props}></SkillTree3D>}
        </>
        <div style={{flex: 1, border: 'black solid 1px', margin: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Here, relevant projects will be listed
        </div>
      </div>
    </div>;
}

export default Skills;
