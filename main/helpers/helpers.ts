import {exec} from "child_process";

export async function isRunning(query: String, callback: Function){
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        callback(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}
export default "";