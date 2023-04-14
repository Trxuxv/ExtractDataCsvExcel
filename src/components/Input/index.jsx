import React, {useCallback} from "react";


import { cep } from "../masks/Mask";

const Input = ({mask, ...props}) =>{

    const handleKeyUp = useCallback((e) =>{
        if(mask === 'cep'){
            return cep(e)
        }
        if(mask === 'cep'){
            return cep(e)
        }
        if(mask === 'cep'){
            return cep(e)
        }
    }, [mask])
    return (
        <input {...props} defaultValue={handleKeyUp}/>
    )
}

export default Input;