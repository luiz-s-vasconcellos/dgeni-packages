const Dgeni = require('dgeni');
const mockPackage = require('../mocks/mockPackage');

describe("renderMarkdown", () => {

  let renderMarkdown, trimIndentation;

  beforeEach(() => {
    const dgeni = new Dgeni([mockPackage()]);
    const injector = dgeni.configureInjector();
    trimIndentation = injector.get('trimIndentation');
    renderMarkdown = injector.get('renderMarkdown');
  });

  it("should render the given markdown content as HTML", () => {
    const html = renderMarkdown(
      '## heading 2\n\n' +
      'some paragraph\n\n' +
      '* a bullet point');
    expect(html).toEqual(
      '<h2>heading 2</h2>\n' +
      '<p>some paragraph</p>\n' +
      '<ul>\n' +
      '<li>a bullet point</li>\n' +
      '</ul>\n'
    );
  });

  it("should trim leading whitespace from code blocks", () => {
    const html = renderMarkdown(
      'some test\n\n' +
      '```\n' +
      '   code\n' +
      '     indented code\n' +
      '   more code\n' +
      '```\n\n' +
      'more text'
    );
    expect(html).toEqual(
      '<p>some test</p>\n' +
      '<pre><code>code\n' +
      '  indented code\n' +
      'more code\n' +
      '</code></pre>\n' +
      '<p>more text</p>\n'
    );

  });

});