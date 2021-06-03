export interface ISkill {
    level?: number,
    name: string,
    children: ISkill[]
}

const skills: ISkill[] = [{
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

export default skills