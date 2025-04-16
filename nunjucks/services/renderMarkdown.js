const { marked } = require('marked');

/**
 * @dgService renderMarkdown
 * @description
 * Render the markdown in the given string as HTML.
 */
module.exports = function renderMarkdown(trimIndentation) {

  const renderer = new marked.Renderer();

  // Remove the leading whitespace from the code block before it gets to the
  // markdown code render function
  renderer.code = ({ text, lang, escaped }) => {

    const trimmedCode = trimIndentation(text);
    let renderedCode = marked.Renderer.prototype.code.call(renderer, { text: trimmedCode, lang, escaped });

    // Bug in marked - forgets to add a final newline sometimes
    if ( !/\n$/.test(renderedCode) ) {
      renderedCode += '\n';
    }

    return renderedCode;
  };

  return content => marked.parse(content, { renderer: renderer });
};