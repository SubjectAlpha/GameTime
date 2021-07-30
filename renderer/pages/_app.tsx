import React from "react";
import type { AppProps } from "next/app";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faGem } from "@fortawesome/free-regular-svg-icons";
import 'react-pro-sidebar/dist/css/styles.css';
import "../styles/globals.css";

function GameTime({ Component, pageProps }: AppProps) {
	return (
        <div className="grid grid-cols-2 gap-4">
            <div className="h-screen">
            <ProSidebar>
                <Menu iconShape="square">
                
                    <MenuItem icon={<FontAwesomeIcon icon={faGem} />}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FontAwesomeIcon icon={faHeart} />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
            </div>
            
            <div>
            <React.Fragment>
                <h1>Test</h1>
                <Component {...pageProps} />
            </React.Fragment>
            </div>
            
        </div>
	);
}

export default GameTime;
