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

    console.log(props)

    return(
        <div className="grid grid-cols-2 p-6 border-2 border-grey-500 rounded-lg space-x-80">
            <h3>
                {props.children}
            </h3>
            
            <Switch onChange={toggleHandler} checked={toggleSetting}/>
        </div>

    )
    
}

export default SettingsComponent;