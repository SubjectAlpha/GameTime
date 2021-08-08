import React from "react";
import Electron from "electron";
import type { AppProps } from "next/app";
import Link from "next/link";
import {NotificationContainer} from "react-notifications";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Modal} from "react-responsive-modal";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import {faCompress, faCog, faGamepad, faHome} from "@fortawesome/free-solid-svg-icons";
import 'react-pro-sidebar/dist/css/styles.css';
import "react-notifications/lib/notifications.css";
import 'react-responsive-modal/styles.css';
import "../styles/globals.css";

function GameTime({ Component, pageProps }: AppProps) {
    const ipcRenderer = Electron.ipcRenderer || false;
    const [collapsed, setCollapsed] = React.useState(true);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    React.useEffect(() => {
        if(ipcRenderer){
            ipcRenderer.send('app_version');
            ipcRenderer.on('app_version', (event, arg) => {
                console.log(arg);
                setOpenUpdate(true);
                ipcRenderer.removeAllListeners('app_version');
            });
        }
    }, []);
    
    const collapse = () => {
        setCollapsed(!collapsed);
    }
	return (
        <div className="grid grid-cols-8">
            <div className="h-screen">
                <ProSidebar collapsed={collapsed} >
                    <SidebarHeader>
                        <Menu iconShape="circle">
                            <MenuItem onClick={collapse} icon={<FontAwesomeIcon icon={faCompress} />}></MenuItem>
                        </Menu>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="circle">
                            <MenuItem icon={<FontAwesomeIcon icon={faHome} />}><Link href="/home">Dashboard</Link></MenuItem>
                            <MenuItem icon={<FontAwesomeIcon icon={faGamepad} />}> <Link href="/games">Games</Link></MenuItem>
                            <SubMenu title="Components" icon={<FontAwesomeIcon icon={faGem} />}>
                                <MenuItem><Link href="/home">Home page</Link></MenuItem>
                                <MenuItem><Link href="/next">2nd page</Link></MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="circle">
                            <MenuItem icon={<FontAwesomeIcon icon={faCog} />}><Link href="/settings">Settings</Link></MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
            
            <div className="col-span-6 container mx-auto">
                <Modal open={openUpdate} onClose={() => setOpenUpdate(false)} center>
                    <h2>There is an update available!</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>
                </Modal>
                <Component {...pageProps} />
            </div>
            <NotificationContainer/>
        </div>
	);
}

export default GameTime;
