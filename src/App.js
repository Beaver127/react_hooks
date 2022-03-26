import './App.css';
import {useInput} from "./hooks/useInput";
import HoverBlock from "./components/HoverBlock";
import TodoList from "./components/TodoList";
import React, {useCallback, useEffect, useState} from "react";
import useDebounce from "./hooks/useDebounce";
import axios from "axios";
import useRequest from "./hooks/useRequest";

function App() {
    // const password = useInput('')
    // const email = useInput('')

    const [value, setValue] = useState('')
    //получение функции callback с задержкой в 500 мс
    const debouncedSearch = useDebounce(search, 500)

    function search(query) {
        const res = fetch('https://jsonplaceholder.typicode.com/todos?query='+query)
            .then(response => response.json())
            .then(json => console.log(json))

        return res
    }

    const onChange = (e) => {
        setValue(e.target.value)
        //вызов колбека
        debouncedSearch(e.target.value)
    }


    //получаем список \ индикатор загрузки и ошибку
    // const [data, loading, error] = useRequest(todoList)
    const [data, loading, error] = useRequest(() => {return axios.get('https://jsonplaceholder.typicode.com/todos')})

    function todoList() {
        //возвращаем промис
        return axios.get('https://jsonplaceholder.typicode.com/todos')
    }

    if(loading) {
        return (
            <h1>Загрузка...</h1>
        )
    }

    if(error) {
        return (
            <h1>Ошибка</h1>
        )
    }




  return (
    <div className="App">
        {/*<input type="text" value={password.value} onChange={password.onChange}/>*/}
        {/*<input type="text" value={email.value} onChange={email.onChange}/>*/}
        {/*<HoverBlock/>*/}
        {/*<TodoList />*/}
        {/*<input type="text" value={value} onChange={onChange} />*/}


        {data && data.map(i => (
            <p key={i.id}>{i.id}: {i.title}</p>
        ))}

    </div>

  );
}

export default App;
