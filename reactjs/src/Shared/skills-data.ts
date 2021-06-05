export interface ISkillNoLevel {
    level?: number,
    name: string,
    children: ISkillNoLevel[]
}

export interface ISkill extends ISkillNoLevel {
    level: number,
    children: ISkill[]
}

const skills: ISkillNoLevel[] = [{
    level: 0,
    name: 'Full Stack',
    children: [{
        name: 'Backend',
        children: [{
            name: '.Net',
            children: []
        }, {
            name: 'Node.js',
            children: []
        }, {
            name: 'Database',
            children: [{
                name: 'SQL',
                children: [{
                    name: 'PostgreSQL',
                    children: []
                }, {
                    name: 'SQL Server',
                    children: []
                }, {
                    name: 'MySQL',
                    children: []
                }]
            }, {
                name: 'NoSQL',
                children: [{
                    name: 'mongoDB',
                    children: []
                }]
            }]
        }]
    }, {
        name: 'Frontend',
        children: [{
            name: 'Angular',
            children: [{
                name: 'Angular2+',
                children: []
            }, {
                name: 'AngularJS',
                children: []
            }]
        }, {
            name: 'React',
            children: []
        }]
    }]
}, {
    level: 1,
    name: 'Data Science',
    children: [{
        name: 'Machine Learning',
        children: []
    }, {
        name: 'TensorFlow (python)',
        children: []
    }]
}, {
    level: 1,
    name: 'DevOps',
    children: [{
        name: 'Scripting',
        children: [{
            name: 'python',
            children: []
        }, {
            name: 'bash', 
            children: []
        }, {
            name: 'PowerShell',
            children: []
        }]
    }, {
        name: 'Octopus', 
        children: []
    }, {
        name: 'TeamCity',
        children: []
    }, {
        name: 'Cloud Platforms',
        children: [{
            name: 'AWS',
            children: []
        }, {
            name: 'Azure',
            children: []
        }, {
            name: 'DigitalOcean',
            children: []
        }]
    }]
}]

const updateLevels = (data: ISkillNoLevel, level=1) => {
    if (data.level === undefined) {
        data.level = level;
    };

    for (const node of data.children) {
        updateLevels(node, data.level+1);
    }

    return data as ISkill;
}

export default skills.map(skill => updateLevels(skill));