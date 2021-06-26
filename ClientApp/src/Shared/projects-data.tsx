import droneImg from '../Content/drone-diagram.png';

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

const projects: IProject[] = // [
    Array(10).fill(null).map(() => (
    {
    title: 'Self flying drone for network performance measurements',
    img: {source: droneImg, alt: 'Project diagram',  width: 650},
    paragraphs: ['The project involved a drone that is self-controlled, holding an Android device that measures network bandwidth. The position, status, and network bandwidth are displayed in real-time on a web application where users can send basic commands to the drone. The drone has sensors on it making it able to avoid obstacles on the given path.',
        'I worked on the development of the AI for drone movement, real-time communication with the server, server with real-time information about the drone’s position and status. Assisted in developing measurement tests for the Android device that the drone was holding.'],
    tech: [{name: '.NET', description: 'Used for server backend.'}, 
    {name: 'SignalR', description: 'Used to send information in real-time from server to the browser.'},
    {name: 'WebGL', description: `Used to display drone's positon in relation to detected obstacles. `}, 
    {name: 'SQL Server', description: 'Database used for the project.'}, 
    {name: 'jQuery', description: 'Used to make the browser interactive.'},
    {name: 'Bootstrap', description: 'UI library used for the project.'},
    {name: 'RaspberryPi', description: 'Little compter that acted as the brain between sensors, movement logic and Android device.'},
    {name: 'Python', description: 'Scripting lanague used for movement AI.'},
    {name: 'DroneKit.', description: 'Python library to control drone.'},
    {name: 'Android/Java', description: 'Used to implement network measurement tests.'}, ],
    buzzwords: ['IOT', 'AI', 'ML']
    }));
//}];
export default projects;