export interface ISkillNoLevel {
    level?: number,
    name: string,
    key?: string,
    children: ISkillNoLevel[]
    experience: number | 'avg' | 'max' | 'min';
}


export interface ISkill extends ISkillNoLevel {
    level: number,
    children: ISkill[],
    experience: number;
    key: string;
}

const avg = (exps: number[]) => exps.length && exps.reduce((a, b) => a + b, 0) / exps.length;
const max = (exps: number[]) => exps.reduce((a, b) => a > b ? a : b, 0);
const min = (exps: number[]) => exps.reduce((a, b) => a > b ? b : a, 99999);

const skills: ISkillNoLevel[] = [{
    level: 0,
    name: 'Full Stack',
    experience: 'avg', 
    children: [{
        name: 'Backend',
        experience: 'max',
        children: [{
            name: '.NET',
            children: [],
            experience: 90
        }, {
            name: 'Node.js',
            children: [],
            experience: 90
        }, {
            name: 'Database',
            experience: 'max',
            children: [{
                name: 'SQL',
                experience: 'max',
                children: [{
                    name: 'PostgreSQL',
                    children: [],
                    experience: 90
                }, {
                    name: 'SQL Server',
                    children: [],
                    experience: 90
                }, {
                    name: 'MySQL',
                    children: [],
                    experience: 50
                }]
            }, {
                name: 'NoSQL',
                experience: 'max',
                children: [{
                    name: 'mongoDB',
                    children: [],
                    experience: 40
                }]
            }]
        }]
    }, {
        name: 'Frontend',
        experience: 'max',
        children: [{
            name: 'Angular',
            experience: 'max',
            children: [{
                name: 'Angular2+',
                key: 'Angular',
                children: [],
                experience: 90,
            }, {
                name: 'AngularJS',
                children: [],
                experience: 90
            }]
        }, {
            name: 'React',
            children: [],
            experience: 70
        }]
    }]
}, {
    level: 1,
    name: 'Data Science',
    experience: 'max',
    children: [{
        name: 'Machine Learning',
        children: [],
        experience: 40
    }, {
        name: 'TensorFlow (Python)',
        children: [],
        experience: 50
    }]
}, {
    level: 1,
    name: 'DevOps',
    experience: 'avg',
    children: [{
        name: 'Scripting',
        experience: 'max',
        children: [{
            name: 'Python',
            children: [],
            experience: 80
        }, {
            name: 'bash', 
            children: [],
            experience: 65
        }, {
            name: 'PowerShell',
            children: [],
            experience: 35
        }]
    }, {
        name: 'Octopus', 
        children: [],
        experience: 80
    }, {
        name: 'TeamCity',
        children: [],
        experience: 80
    }, {
        name: 'Docker',
        children: [],
        experience: 70
    },
    {
        name: 'Cloud Platforms',
        experience: 'max',
        children: [{
            name: 'AWS',
            children: [],
            experience: 65
        }, {
            name: 'Azure',
            children: [],
            experience: 65
        }, {
            name: 'DigitalOcean',
            children: [],
            experience: 65
        }]
    }]
}]

const updateNodes = (data: ISkillNoLevel, level=1) => {
    if (data.level === undefined) {
        data.level = level;
    }

    if (data.key === undefined) {
        data.key = data.name;
    }

    for (const node of data.children) {
        updateNodes(node, data.level+1);
    }

    if (data.experience === 'avg') {
        data.experience = avg(data.children.map(c => c.experience as number));
    } else if (data.experience === 'max') {
        data.experience = max(data.children.map(c => c.experience as number));
    } else if (data.experience === 'min') {
        data.experience = min(data.children.map(c => c.experience as number));
    }

    return data as ISkill;
}

export default skills.map(skill => updateNodes(skill));