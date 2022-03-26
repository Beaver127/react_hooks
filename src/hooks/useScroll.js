import {useEffect, useRef, useState} from "react";

//принимаем Ref на родителя и на ребёнка(последнего) в блоке который будем отслеживать на скрол
export default function useScroll(parentRef, lastChildRef, callback) {

    //слушатель скрола
    const observer = useRef()
    //индикатор загрузки
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {

        //root - родитель
        //rootMargin - отступы
        //threshold - (0: если только увидели в окне объект,1: полностью проскролить весь объект)
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 1
        }

        observer.current = new IntersectionObserver(([target]) => {
            //если загрузка то выходим
            if(load || error) return;
            //если в области видимости то вызываем колбек
            if(target.isIntersecting ) {
                setLoad(true)
                //когда получили данные индикатор загрузки ставим в false
                callback()
                    .catch(err => {
                        setError(err)
                        console.log(err)
                    } )
                    .finally(() => {
                    setLoad(false)
                })
            }
        }, options)

        //включаем прослушку
        observer.current.observe(lastChildRef.current)

        //при демонтировании выключаем прослушку (чтобы избежать дуюлирование множества прослушок)
        return function () {
            observer.current.unobserve(lastChildRef.current)
        }

    }, [load])

    //возвращаем индиктор загрузки(динамически)
    return load
}