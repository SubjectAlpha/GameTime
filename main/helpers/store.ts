import Store from "electron-store";

const schema = {
    osNotifications: {
        type: "boolean",
        default: true
    },
    autoStart: {
        type: "boolean",
        default: false
    }
}

const store = new Store({schema});

export default store;