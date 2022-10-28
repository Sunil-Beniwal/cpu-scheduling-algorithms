var express = require('express');
var app = express();

app.get('/', (req, res)=>{res.sendFile('index.html', { root: __dirname });});
app.get('/round-robin', (req, res)=>{res.sendFile('round-robin.html', { root: __dirname });});
app.get('/shortest-job-first', (req, res)=>{res.sendFile('shortest-job-first.html', { root: __dirname });});
app.get('/shortest-remaining-time-first', (req, res)=>{res.sendFile('shortest-remaining-time-first.html', { root: __dirname });});
app.get('/js/app.js', (req, res)=>{res.sendFile('js/app.js', { root: __dirname });});
app.listen(8080, function()
{
	console.log("When Server Starts, Log This");
});