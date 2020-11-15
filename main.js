// import { sayhi } from "./tetromino";

var blockSize = 30;
var timer;

const canvas = document.getElementById("canvas");
canvas.width = 10 * blockSize;
canvas.height = 17 * blockSize;
var ctx = canvas.getContext("2d");

sayhi();