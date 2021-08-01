import { PageHeader, Radio, RadioChangeEvent } from 'antd';
import React, { useCallback } from 'react';
import ProjectList from '../Projects/ProjectList/ProjectList';
import SkillList from './SkillList/SkillList';
import styles from './Skills.module.scss';
import SkillTree from './SkillTree/SkillTree.lazy';
import SkillTree3D from './SkillTree3D/SkillTree3D.lazy';
import projects from '../Shared/projects-data';
import { skillsList } from '../Shared/skills-data';
import { generatePath, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

type SkillsView = 'list' | 'tree' | '3dtree';

function useFiltersQuery() {
  const queryParams = new URLSearchParams(useLocation().search);

  return ({
    tags: queryParams.get('tech')?.split(',').filter(t => skillsList.some(s => s.key === t)) || [],
  });
}

const Skills: React.FC<ISkillsProps> = (props: ISkillsProps) => {
  let { skillsView } = useParams<{skillsView?: SkillsView}>();
  skillsView = skillsView || 'list';

  const { tags } = useFiltersQuery();
  const { path } = useRouteMatch();
  const history = useHistory();

  const buildUrl = useCallback(({tags, skillsView='list'}: {tags: string[], skillsView?: SkillsView}) => {
    let newUrl = generatePath(path, {skillsView});
    
    let separator = '';
    if (tags.length) {
      newUrl += '?';

      if (tags.length) {
        newUrl += `${separator}tech=${tags.join(',')}`;
        separator = '&'
      }
    }

    history.push(newUrl);
  }, [history, path]);

  const setTags = useCallback((tags) => buildUrl({tags, skillsView}), [skillsView, buildUrl]);
  const updateSkillsView = useCallback((skillsView) => buildUrl({tags: [], skillsView}), [buildUrl]);

  const filteredProjects = projects.filter(p => {
    if (tags.length) {
      return p.tech.some(t => tags.includes(t.name));
    }

    return !p.hideWithAll;
  });

  const onSkillViewChange = (e: RadioChangeEvent) => {
    updateSkillsView(e.target.value);
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
          {skillsView === 'list' && <SkillList setTags={setTags} tags={tags}></SkillList>}
          {skillsView === 'tree' && <SkillTree setTags={setTags} tags={tags}></SkillTree>}
          {skillsView === '3dtree' && <SkillTree3D setTags={setTags} tags={tags} {...props}></SkillTree3D>}
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
