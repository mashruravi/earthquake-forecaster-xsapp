var express = require('express');
var httpProxy = require('http-proxy');

var app = express();

app.use(express.static('ui'));

var proxy = httpProxy.createProxyServer({
    target: "https://moonshotp1940934211trial.hanatrial.ondemand.com",
    changeOrigin: true
});

app.route("/earthquake-forecaster*").all((req, res) => {
    proxy.web(req, res);
});

let portNumber = '8000';
app.listen(process.env.PORT || portNumber, () => {
    console.log("Server started on port " + portNumber);
})