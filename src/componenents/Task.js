import { FaTimes } from 'react-icons/fa'

export const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={
            `task ${task.reminder
                ? 'reminder' : ''}`
        }
            onDoubleClick={() =>
                onToggle(task.id)}>
            <h3>{task.text}
                <FaTimes style={FaTimesStyle}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

const FaTimesStyle = {
    color: 'red',
    curser: 'pointer'
}