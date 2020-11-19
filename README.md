# Tetris Vanilla

An object-oriented implementation of the Tetris game, written in pure JavaScript.

## Purpose

-   learn to use this [canvas thing](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
-   have a fun way of using the best features of the framework-less, vanilla version of javascript. Those features are :
    -   Object-Oriented Classes, ES2015-style
    -   [JSDocs](https://github.com/jsdoc/jsdoc), the best way to document and "type" javascript
-   have fun because tetris
-   prove my value in these dire times of a global pandemic combined with a ruthless job market

## How to launch with VS Code `live server extension`

Most browsers won't allow file imports, for cross-origin requests reasons, so we got to access the entry point from a web server. However we don't want to configure apache or nginx just for developement purposes. I sujest you use the VScode [live server extemsion](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

First of all clone this repo:

```
git clone https://github.com/Keksoj/tetris-vanilla.git
cd tetris-vanilla
code .
```

And click `Go Live`. The extension will launch a little web server that listens on `localhost:5502`, and will even open the page in your favorite browser.