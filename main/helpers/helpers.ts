import find from "find-process";

export async function isRunning(query: String, callback: Function){
    let res = await find("name", query.toLowerCase());
    callback(res.length > 0);
}
export default "";