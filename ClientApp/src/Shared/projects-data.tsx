import droneImg from '../Content/drone-diagram.png';
import poslovkoImg from '../Content/poslovko.png';

interface ITech {
    name: string;
    description: string
}

interface IProject {
    title: string,
    img?: {source: string, alt: string, width: number},
    paragraphs: { 0: string } & string[],
    tech: ITech[],
    buzzwords: string[]
    
}

const projects: IProject[] = [{
    title: 'Self flying drone for network performance measurements',
    img: {source: droneImg, alt: 'Project diagram',  width: 650},
    paragraphs: ['The project involved a drone that is self-controlled, holding an Android device that measures network bandwidth. The position, status, and network bandwidth are displayed in real-time on a web application where users can send basic commands to the drone. The drone has sensors on it making it able to avoid obstacles on the given path.',
        'I worked on the development of the AI for drone movement, real-time communication with the server, server with real-time information about the drone’s position and status. Assisted in developing measurement tests for the Android device that the drone was holding.'],
    tech: [
        {name: '.NET', description: 'Used for server backend.'}, 
        {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.'},
        {name: 'WebGL', description: `Used to display drone's positon in relation to detected obstacles. `}, 
        {name: 'SQL Server', description: 'Database used for the project.'}, 
        {name: 'JavaScript/jQuery', description: 'Used to make the browser interactive.'},
        {name: 'Bootstrap', description: 'UI library used for the project.'},
        {name: 'RaspberryPi', description: 'Little compter that acted as the brain between sensors, movement logic and Android device.'},
        {name: 'Python', description: 'Scripting lanague used for movement AI.'},
        {name: 'DroneKit.', description: 'Python library to control drone.'},
        {name: 'Android/Java', description: 'Used to implement network measurement tests.'},
        {name: 'Azure', description: 'Clould computing service used to deploy the app.'}, 
    ],
    buzzwords: ['IOT', 'AI', 'ML']
}, {
    title: 'Work marketplace for finding workers for your shortterm projects - PosLovko',
    img: {source: poslovkoImg, alt: 'PosLovko UI',  width: 650},
    paragraphs: ['The platform allows clients to post jobs (when looking for professional help). Professionals, with the advanced search, can find related jobs and apply to them. Similarly, professionals can post their services to allow customers to contact them directly. Platform eases communication between client and professional with its real-time chat functionality and notification system. After the professional finishes the task, the client gives a review to the professional, and the professional gives a review for the client that is used for future ranking.',
        `I've developed the whole platform myself.`],
    tech: [
        {name: 'Node.js', description: 'Used for server backend.'}, 
        {name: 'PostgreSQL', description: 'Database used for the project and for raising pub-sub events.'},
        {name: 'Angular/Javascript', description: `Framework used for frontend. `}, 
        {name: 'WebSocket', description: 'Used to send information in real-time from server to the browser.'}, 
        {name: 'Angular Material', description: 'UI library used for the project.'},
        {name: 'AWS', description: 'Clould computing service used to deploy the app'}
    ],
    buzzwords: ['Startup', 'Client/Server', 'Algorithms', 'Scraping']
}];
export default projects;