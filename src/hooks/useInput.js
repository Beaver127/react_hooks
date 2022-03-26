import {useState} from "react";

//для сокращения кода
export function useInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {value, onChange}
}