import React, {useRef} from 'react';
import useHover from "../hooks/useHover";

const HoverBlock = () => {

    const ref = useRef()
    const isHovering = useHover(ref)

    return (
        <div ref={ref} style={{height: 300, width: 300, background: isHovering ? "green" : "red"}} >

        </div>
    );
};

export default HoverBlock;