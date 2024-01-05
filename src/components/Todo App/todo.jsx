import React, { useState } from 'react'
import './todo.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Todo() {
    let allTodos = [];
    let todos = localStorage.getItem('todos');
    if (todos !== null) {
        allTodos = JSON.parse(todos)
    }
    // states
    let [list, setList] = useState([]);
    let [inputtext, setInputText] = useState('');
    let [editIndex, setEditIndex] = useState(false);
    let [iconsDisplay, setIconsDisplay] = useState({});
    function updateText(e) {
        setInputText(e.target.value);
    }

    const additems = (event) => {
        event.preventDefault();
        if (editIndex !== false) {
            const updatedList = allTodos;
            updatedList[editIndex] = inputtext;
            localStorage.setItem('todos', JSON.stringify(updatedList));
            setList(updatedList);
            setEditIndex(false);
            setInputText("")
        } else {

            let copyList = [...list]
            copyList.push(inputtext)
            allTodos.push(inputtext);
            localStorage.setItem('todos', JSON.stringify(allTodos))
            setList(allTodos)
            setInputText("")
            console.log(copyList);
        }
    }
    function deleteItem(e) {
        // let copyList = [...list];
        allTodos.splice(e, 1)
        localStorage.setItem('todos', JSON.stringify(allTodos))
        setList(allTodos)
    }
    function clearAll() {
        localStorage.clear()
        setList([])
    }
    function editItem(e) {
        const updatedList = allTodos;
        setInputText(updatedList[e])
        setEditIndex(e)
        // let updateTodo = prompt('Enter Edit Value', allTodos[e]);
        // if(updateTodo==''){
        //     return
        // }
        // if(updateTodo!==null){
        //     allTodos[e] = updateTodo;
        //     localStorage.setItem('todos', JSON.stringify(allTodos));
        //     setList(allTodos)
        // }




        // // let copyList = [...list]
        // allTodos.splice(e)
        // console.log(updateTodo);
        // allTodos.push(updateTodo)
        // localStorage.setItem('todos', JSON.stringify(allTodos))
        // setList(allTodos)
    }
    function mouseEnter(index, isEntering) {
        console.log(isEntering);
        setIconsDisplay({
            [index]: isEntering ? 'block' : 'none'
        })
    }
    return (
        <div className='todo-container'>

            <div className='header'>

                <div className="heading">
                    <h1>Todo App</h1>
                </div>

            </div>

            <div className='todo-content'>

                <div className='todo-input'>
                    <form className='todo-input' onSubmit={additems}>
                        <div className='todoInput'>
                            <input  required onChange={updateText} placeholder="Add a new task...." type="text" value={inputtext} />
                        </div>
                        <div className='add-btn'>
                            <button type='submit'>{editIndex !== false ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>
                    <div className="clear-btn">
                        <button className="clearAll" onClick={clearAll}>Clear All</button>
                    </div>
                </div>

                <hr className="hr" />


                <div className="todo-ul">
                    <ul className="todo-box">

                        {
                            allTodos.map((v, i) => {
                                return <li className='task' onMouseEnter={() => mouseEnter(i, true)} onMouseLeave={() => mouseEnter(i, false)}>
                                    <p>{v}</p>
                                    <div className='todo-setting' style={{ display: iconsDisplay[i] || 'none' }}>
                                        <div className='btn-setting'>
                                            <abbr title="Edit Todo"><button onClick={() => editItem(i)}>{<EditIcon />}</button></abbr>
                                            <abbr title="Delete Todo"><button onClick={() => deleteItem(i)}>{<DeleteForeverIcon />}</button></abbr>
                                        </div>
                                    </div>
                                </li>
                            })
                        }

                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Todo