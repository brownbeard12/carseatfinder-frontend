module.exports = function(config) {

    config.addPassthroughCopy('src/css/main.css');
    config.addPassthroughCopy('src/js/index.js');

    return {
        passthroughFileCopy: true,
        dir: {
          input: "src",
          output: "_site"        }
    }

}