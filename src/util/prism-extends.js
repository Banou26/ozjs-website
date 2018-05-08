import Prism from 'prismjs'

Prism.languages.insertBefore('javascript', 'template-string', {
  'html-template-string': {
    pattern: /(html)`(?:\\[\s\S]|[^\\`])*`/,
    lookbehind: true,
    inside: {
      'interpolation': {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      rest: Prism.languages.markup
    }
  },
  'css-template-string': {
    pattern: /(css)`(?:\\[\s\S]|[^\\`])*`/,
    lookbehind: true,
    inside: {
      'interpolation': {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      rest: Prism.languages.css
    }
  }
})