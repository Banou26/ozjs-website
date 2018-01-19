export default {
  type: 'lang',
  regex: /```(\w*)\n(.*)```/g,
  replace: '<oz-code language="$1" value="$2" display="compact"></oz-code>'
}
