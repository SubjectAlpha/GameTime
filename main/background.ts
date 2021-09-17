import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { autoUpdater } from "electron-updater";
import { createWindow } from "./helpers";
import db from "./helpers/database";
import store from "./helpers/store";
import { isRunning } from "./helpers/helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		width: 1000,
		height: 600,
	});

	if (isProd) {
		await mainWindow.loadURL("app://./home.html");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/home`);
		mainWindow.webContents.openDevTools();
	}
    //Installer and auto updater stuff: https://medium.com/@johndyer24/creating-and-deploying-an-auto-updating-electron-app-for-mac-and-windows-using-electron-builder-6a3982c0cee6
	//Auto launc: https://www.npmjs.com/package/auto-launch
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on("update-available", () => {
        mainWindow.webContents.send("update_available");
    });
    autoUpdater.on("update-downloaded", () => {
        mainWindow.webContents.send("update_downloaded");
    });
})();

async function populateGameStore(){
    console.log("no games found in store. downloading...");
    let games = [];
    const querySnapshot = await db.collection("games").get();
    querySnapshot.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data());
        games.push(doc.data().Name);
    })
    console.log("end of check");
    console.log(games);
    store.set("games", games);
}

//Polling to check for running games
setInterval(async () => {
    console.log("polling");
    let games: [] = store.get("games");
    console.log(games);
    //games = JSON.parse(games);
    if(games.length > 0){
        games.forEach(game => {
            isRunning(game, (status) => {
                console.log(status);
            });
        });
    } else {
        populateGameStore()
    }
}, 10000)

app.on("window-all-closed", () => {
	app.quit();
});

ipcMain.on("app_version", (event) => {
	event.reply("app_version", app.getVersion());
});
