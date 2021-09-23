import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { autoUpdater } from "electron-updater";
import { createWindow } from "./helpers";
import db from "./helpers/database";
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

	const docRef = db.collection("games").doc("valorant");
	let doc = await docRef.get();
    const docData = doc.data();
	console.log(docData);
	isRunning(docData.Name, (status) => {
		console.log(status);
	});
    isRunning("firefox", (status) => {
		console.log(status);
	});
})();

app.on("window-all-closed", () => {
	app.quit();
});

ipcMain.on("app_version", (event) => {
	event.reply("app_version", app.getVersion());
});
