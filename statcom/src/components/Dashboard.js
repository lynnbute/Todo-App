import React, {useState, useEffect} from 'react'
import "../css/Dashboard.css"
import AddToDo from './AddToDo'
import AvailableToDo from './AvailableToDo'

const Dashboard = () => {
    const [current, setCurrent] = useState('available')
    const handlePage = (page) => {
        setCurrent(page)
    }
    return (
        <div className='dashboard'>
            <div className='actions'>
                <button onClick={()=>handlePage('add')}>Create TODO</button>
                <button onClick={()=>handlePage('available')}>Available TODO</button>
            </div>
            {current === 'add' ? <AddToDo /> : <AvailableToDo />}
            
        </div>
    )
}

export default Dashboard