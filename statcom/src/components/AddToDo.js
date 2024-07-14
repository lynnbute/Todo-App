import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { domain } from './Domain'
import "../css/AddToDo.css"
import { useLoginContext } from './LoginContext'
import useApiRequest from './useApiRequest'

const AddToDo = () => {
    const { userInfo } = useLoginContext()
    const { postRequest } = useApiRequest()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const data = {
        owner: userInfo.id,
        name: "",
        description: ""
    }
    const [todoData, setTodoData] = useState(data)

    const handleInputChange = (event) => {
        const {name, value } = event.target
        setTodoData({
            ...todoData,
            [name] : value}
        )
    }

    const handleToDo = async(event) => {
        event.preventDefault()
        const formData = new FormData()
        for(let key in todoData){
            if(todoData[key] === ''){
                setError(`${key} is required`)
                setTimeout(()=>setError(''),3000)
                return
            }else{
                formData.append(key, todoData[key])
            }
        }
        setError('')
        const response = postRequest(`${domain}/todo`, formData)
        if(response){
            console.log(data)
            setError(`${data['name']} added successfully`)
            setLoading(false)
            setTodoData(data)
            setTimeout(()=>setError(''), 3000)
        }
            
    }
    return (
        <div className='todo'>
            <form onSubmit={handleToDo}>
                <h1>Add ToDo Item</h1>
                {error !== '' && <p>{error}</p>}

                <label>Name</label>
                <input type='text' 
                    placeholder='name' 
                    name='name'
                    value={todoData.name}
                    onChange={handleInputChange} />
                <label>Description</label>
                <textarea 
                    rows={5}
                    placeholder='description ...' 
                    name='description'
                    value={todoData.description}
                    onChange={handleInputChange}></textarea>
                <button>{loading ? 'Adding Item ...' : 'Add Item'}</button>
            </form>
        </div>
    )
}

export default AddToDo