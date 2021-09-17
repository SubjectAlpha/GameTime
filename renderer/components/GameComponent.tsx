import React from "react";
import { CircleSlider } from "react-circle-slider";
import Switch from "react-switch";

function GameComponent(props){
    const [gameEnabled, setEnabled] = React.useState(true);

    const toggleHandler = () => {
        setEnabled(!gameEnabled);
    }

    return(
        <div className="grid grid-cols-2 p-6 border-2 border-grey-500 rounded-lg space-x-80">
            <h1>{props.children}</h1>
            <Switch onChange={toggleHandler} checked={gameEnabled}/>
            <CircleSlider
                value={1}
                showTooltip={true}
                gradientColorFrom="#FEA346"
                gradientColorTo="#F8616D"
                min={1}
                max={24}
            />
        </div>
    )
}

export default GameComponent;