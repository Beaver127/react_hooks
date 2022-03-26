import React, {useEffect, useRef, useState} from 'react';
import userEvent from "@testing-library/user-event/dist";
import useScroll from "../hooks/useScroll";

const TodoList = () => {

    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const lastElement = useRef()
    const parent = useRef()
    const load = useScroll(parent, lastElement, () => fetchTodo(page, limit))
    function fetchTodo(page, limit) {
            const res = fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    setList(prev => [...prev, ...json])
                    setPage(prev => prev + 1)
                })
        return res
    }



    return (
        <div ref={parent} style={{height: '190vh', overflow: 'auto'}}>

            {list.map(i => (
                <p key={i.id}>{i.id}: {i.title}</p>
            ))}
            {load ? "load..." : ""}
            <div ref={lastElement} style={{height: 20, background: "red"}}></div>
        </div>

    );
};

export default TodoList;