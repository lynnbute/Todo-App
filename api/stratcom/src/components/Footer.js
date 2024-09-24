import React, {useState, useEffect, useRef} from 'react'

const Footer = () => {
    const [count, setCount] = useState(0)
    const count2 = useRef(0)
    const inputRef = useRef()

    const handleIncrement = () => {
        setCount(count => count + 1)
    }

    const handleIncrement2 = () => {
        count2.current = count2.current + 1
        console.log(count2)
    }

    useEffect(()=>{
        console.log('component has loaded and runs once')
    },[])

    useEffect(()=>{
        console.log('component has loaded, can be called ')

        return () => {
            console.log('clean up! component unmounted')
        }
    },[count])

    //npm install react-router-dom
    return (
        <div>
            <p>Current Count: {count}</p>
            <p>Use ref Count: {count2.current}</p>
            <form>
                <input type='text' ref={inputRef} placeholder='uname' />
                <input type='pword' placeholder='pword' />
                <button>submit</button>
            </form>
            <button onClick={handleIncrement}>increment count</button>
            <button onClick={handleIncrement2}>increment count2</button>
            <button onClick={()=> inputRef.current.focus()}>focus input</button>
        </div>
    )
}

export default Footer