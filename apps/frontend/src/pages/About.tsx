import { Todos } from '../components/ToDo'

const About: React.FC = () => {
    return (
        <div>
            <h1>The todo list has not re-rendering when add or remove a todo. Please check the console log</h1>
            <Todos />
        </div>
    )
}

export default About
