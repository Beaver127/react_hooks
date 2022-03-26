import {useEffect, useState} from "react";

export default function useHover(ref) {
    //индиктор навода на объект
    const [isHovering, setHovering] = useState(false)

    const on = () => setHovering(true)
    const off = () => setHovering(false)

    useEffect(() => {

        //не пустой ли объект \ привязан ли к DOM
        if(!ref.current) return;
        const node = ref.current

        node.addEventListener("mouseenter",on)
        node.addEventListener("mousemove", on)
        node.addEventListener("mouseleave", off)


        //при демонтировании удаляем слушатели
        return function () {
            node.removeEventListener("mouseenter",on)
            node.removeEventListener("mousemove", on)
            node.removeEventListener("mouseleave", off)
        }
    }, [])

    return isHovering

}