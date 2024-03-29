const htmlnano = require("htmlnano");

const isProduction = process.env.NODE_ENV === "production";

module.exports = function (config) {
  config.setUseGitIgnore(false);

  config.addPassthroughCopy("src/assets");

  if (isProduction) {
    config.addTransform("html-min", (content, outputPath) => {
      if (outputPath) {
        const isHtml = outputPath.endsWith(".html");

        if (isHtml) {
          return htmlnano
            .process(content, {
              collapseAttributeWhitespace: true,
              collapseWhitespace: "conservative",
              deduplicateAttributeValues: false,
              minifyCss: false,
              minifyJs: true,
              minifyJson: false,
              minifySvg: false,
              removeComments: "safe",
              removeEmptyAttributes: false,
              removeAttributeQuotes: false,
              removeRedundantAttributes: true,
              sortAttributesWithLists: false,
              removeOptionalTags: false,
              collapseBooleanAttributes: true,
              mergeStyles: false,
              mergeScripts: false,
              minifyUrls: false,
            })
            .then((result) => result.html);
        }
      }

      return content;
    });
  }

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    templateFormats: ["md", "njk"],
  };
};
