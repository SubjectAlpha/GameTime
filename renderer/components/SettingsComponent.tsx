import React from "react";
import Switch from "react-switch";
import store from "../../main/helpers/store";

function SettingsComponent(props){

    const [toggleSetting, setToggle] = React.useState(props.value);

    const toggleHandler = () => {
        let notifs = store.get(props.name);
        store.set(props.name, !notifs);
        setToggle(!notifs);
    }

    return(
        <div className="grid grid-cols-8 m-2 p-4 border-2 border-grey-500 rounded-lg">
            <h3 className="col-span-7">
                {props.children}
            </h3>
            
            <Switch onChange={toggleHandler} checked={toggleSetting} disabled={props.disabled}/>
        </div>

    )
    
}

export default SettingsComponent;