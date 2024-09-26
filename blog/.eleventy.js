module.exports = function(eleventyConfig) {
    return {
      dir: {
        input: "blog",
        output: "_site"
      }
    };
  };
  module.exports = function(eleventyConfig) {
    // Create a collection for blog posts
    eleventyConfig.addCollection("posts", function(collection) {
      return collection.getFilteredByGlob("blog/posts/*.md").reverse();
    });
  
    return {
      dir: {
        input: "blog",
        output: "_site"
      }
    };
  };
  