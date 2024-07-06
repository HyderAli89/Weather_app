const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homefile = fs.readFileSync("index.html", "UTF-8");
const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2); // Convert to Celsius and round to 2 decimal places
};
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", toCelsius(orgVal.main.temp));
    temperature = temperature.replace("{%tempmax%}", toCelsius(orgVal.main.temp_max));
    temperature = temperature.replace("{%tempmin%}", toCelsius(orgVal.main.temp_min));
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;
};
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=idar&appid=7d3f77f5e6d240bcf5ab2687815c4316")
            .on("data", (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                const realTimeData = arrData.map((val) => replaceVal(homefile, val)).join("");
                res.write(realTimeData);  
            })
            .on("end", (err) => {
                if (err) return console.log("connection closed due to errors", err);
                res.end();  // End the response
                console.log("end");
            });
    } 

});
const port = 8005;
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
