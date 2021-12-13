import { createContext, useState } from "react";

export const EditToggleProfile = createContext();


const EditToggleProfileProvider = props => {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <EditToggleProfile.Provider value={{isEdit}}>
            {props.children}
        </EditToggleProfile.Provider>
    )
}

export default EditToggleProfileProvider;