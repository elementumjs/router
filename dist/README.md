## Build Files

| | UMD | CommonJS | ES Module |
|---:|:---:|:---:|:---:|
| **File** | router.umd.js | router.cjs.js | router.esm.js |

### Terms and import

#### UMD

[UMD](https://github.com/umdjs/umd) builds can be used directly in the browser via a `<script>` tag. The default file from jsDelivr CDN at [https://www.jsdelivr.com/gh/elementumjs/router](https://cdn.jsdelivr.net/gh/elementumjs/router/dist/router.umd.js) is the UMD build (`router.umd.js`).

* **index.html**

```html
    <script src="/node_modules/elementumjs/router/dist/router.umd.js"></script>
    <script src="index.js"></script>
```

* **index.js**

```javascript
    //...
    window['router'] = Rotuer(target, routes);
```

#### CommonJS

[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) builds are intended for use with older bundlers like [browserify](http://browserify.org/) or [webpack 1](https://webpack.github.io). The default file for these bundlers (`pkg.main`) is the CommonJS build (`router.cjs.js`).

* **index.html**

```html
    <script src="index.js"></script>
```

* **index.js**

```javascript
    const router = require("elementumjs/router");

    //...
    window['router'] = Rotuer(target, routes);
```

#### ES Module

[ES Module](http://exploringjs.com/es6/ch_modules.html) builds are intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org/). The default file for these bundlers (`pkg.module`) is the ES Module build (`router.esm.js`).

* **index.html**

```html
    <script src="index.js" type="module"></script>
```

* **index.js**

```javascript
    import router from "@elementumjs/router";

    //...
    window['router'] = Rotuer(target, routes);
```

### Download locally

Install via `npm`:

```sh
    npm install @elementumjs/router
```