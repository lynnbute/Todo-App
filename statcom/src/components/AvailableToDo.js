import React, {useState, useEffect} from 'react'
import { domain } from './Domain'
import "../css/AvailableToDo.css"
import useApiRequest from './useApiRequest'


const AvailableToDo = () => {
    const { getRequest, putRequest, deleteRequest } = useApiRequest()
    const [todo, setTodo] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setrefresh] = useState(false)

    const fetchData = async() => {
        const res = await getRequest(`${domain}/todo`)
        if(res){
            setTodo(res)
            setLoading(false)
            setrefresh(false)
        }    
    }

    useEffect(()=>{
        fetchData()
    },[refresh])

    const handleUpdate = async(item) => {
        const formData = new FormData()
        formData.append('id', item.id)
        formData.append('completed', true)
        const res = await putRequest(`${domain}/todo/${item.id}`, formData)
        if(res){
            setrefresh(true)
        }
    }

    const handleDelete = async(item) => {
        if(window.confirm(`Confirm delete of ${item.name} ?`)){
            const res = await deleteRequest(`${domain}/todo/${item.id}`)
            if(res){
                setrefresh(!refresh)
            }
        }
    }

    return (
        <div className='available'>
            <h1>Available ToDo Items</h1>
            <div className='content'>
                {todo.length > 0 && todo.map(item => (
                    <div className='div' key={item.id}
                        style={{background: item.completed && 'gray'}}>
                        <input 
                            type='checkbox' 
                            disabled = {item.completed ? true : false}
                            checked = {item.completed ? true : false}
                            onClick={()=>handleUpdate(item)}
                            />
                        <div>
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                        </div>
                        <button onClick={()=>handleDelete(item)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AvailableToDo