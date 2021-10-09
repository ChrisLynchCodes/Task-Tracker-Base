import {Task} from './Task'

//export arrow function with props grabbed
export const Tasks = ({tasks, onDelete, onToggle}) => {
    
    return (
        <>
            {tasks.map((task) => (
            // Outputing components in the loop and passing tasks in as props
            <Task key={task.id} task={task} 
            onDelete={onDelete}
            onToggle={onToggle}
            
            />
            
            ))}
        </>
    )
}
