/**
 * This is a route file
 * Consists of all routes(url's) responsible for querying comment table
 */
import {ResourceManager} from "../ResourceManager.js"

export default commentAPI = ()=>{
    ResourceManager.get("/", (req, res) => {
        connection.query("SELECT * from comment", (err, rows) => {
        if (err) {
            res.json({
            success: false,
            err,
            });
        } else {
            res.json({
            success: true,
            rows,
            });
        }
        });
    });
}