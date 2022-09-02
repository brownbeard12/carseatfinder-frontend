module.exports = function(config) {

    config.addPassthroughCopy('src/css/main.css');
    return {
        passthroughFileCopy: true,
        dir: {
          input: "src",
          output: "_site"        }
    }

}