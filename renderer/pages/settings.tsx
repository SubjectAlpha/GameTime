import Head from "next/head";
import React from "react";
import {NotificationManager} from 'react-notifications';
import SettingsComponent from "../components/SettingsComponent";
import store from "../../main/helpers/store";

function Settings(){
    
    return(
        <React.Fragment>
            <Head>
                <title>Settings</title>
            </Head>

            <div className="w-full">
                <SettingsComponent name="osNotifications" value={store.get("osNotifications")}>Enable OS notifications</SettingsComponent>
                <SettingsComponent name="autoStart" value={store.get("autoStart")} disabled>Auto Start</SettingsComponent>
            </div>
        </React.Fragment>
    )
}

export default Settings;