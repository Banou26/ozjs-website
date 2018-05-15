import { poz, css, registerElement, ref } from 'oz.js'
import './mount.js'
// import Header from './header.js'
import Code from './code.js'
import Markdown from './markdown.js'
import * as overview from '../documentation/overview.js'

const style = ({state: { loading }}) => css`
@import url('https://fonts.googleapis.com/css?family=Roboto:100');

:host, app-index {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns:
  calc(100% / 3) calc(calc(calc(100% / 3) - 31rem) / 2) 4rem 23rem 4rem calc(calc(calc(100% / 3) - 31rem) / 2) calc(100% / 3);
  grid-template-rows: 10rem 12rem 4rem 4rem 5rem 5rem 5rem 5rem 5rem auto auto;
  grid-template-areas:
    ". . . . . . ."
    ". . . logo . . ."
    ". . . logo github . ."
    ". . . logo discord . ."
    ". . . . . . ."
    "title title title title title title title"
    ". . . . . . ."
    ". . left-nav . right-nav . ."
    ". . . . . . ."
    "markdown code code code code code result"
    "footer footer footer footer footer footer footer";
  background-color: #0f0f0f;
}

.logo {
  width: 23rem;
  grid-area: logo;
}

.github {
  grid-area: github;
  height: 3.2rem;
  width: 3.2rem;
  background-size: cover;
  background-image: url(/assets/imgs/github-light-120.png);
}

.discord {
  grid-area: discord;
  height: 4rem;
  width: 4rem;
  background-size: cover;
  background-image: url(/assets/imgs/discord-logo-white.svg);
}

h1 {
  grid-area: title;
  text-align: center;
  color: #ECECEC;
  font-family: Roboto;
  font-size: 4rem;
  font-weight: 100;
}
h1 img {
  position: absolute;
  height: 5rem;
  vertical-align: bottom;
}

.placeholder-loading-icon {
  height: 4.8rem;
  opacity: ${loading ? '0' : '.11666'};
}

.title-placeholder {
  border-radius: .3rem;
  margin-left: 1rem;
  color: ${`hsla(0, 0%, 93%, ${loading ? '1' : '0'})`};
}
.title-placeholder { user-select: ${loading ? 'unset' : 'none'}; }
.title-placeholder { background-color: ${`hsla(0, 0%, 17%, ${loading ? '0' : '1'})`}; }

.to-guide, .to-api {
  z-index: 1;
  position: relative;
  padding: 1rem 4rem;
  border: .1rem solid;
  border-radius: .5rem;
  font-family: Roboto;
  font-size: 2rem;
  font-weight: 100;
  color: white;
  overflow: hidden;
}

.to-guide {
  grid-area: left-nav;
  border-color: #51bb8d;
  background: linear-gradient(230deg, #0000 49%, #51bb8d 50%);
}
.to-api {
  grid-area: right-nav;
  border-color: #f9aa40;
  background: linear-gradient(230deg, #0000 49%, #f9aa40 50%);
}

/* animation */
.to-guide, .to-api {
  background-size: 300% 100%;
  background-position:right bottom;
}

.to-guide:hover, .to-api:hover {
  background-position: left bottom;
  transition: background-position .3s ease;
}

.to-guide:before, .to-api:before {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 250%;
  z-index: -1;
  transition: transform .6s ease;
  transform: translate(50%);
  opacity: 1;
}

.to-guide:hover:before, .to-api:hover:before {
  transform: translate(-57.5%);
  opacity: 0;
}

.to-guide:before {
  background: linear-gradient(230deg, #51bb8d 49%, #0000 50%);
}
.to-api:before {
  background: linear-gradient(230deg, #f9aa40 49%, #0000 50%);
}
/* /animation */

.overview {
  grid-area: overview;
  display: flex;
  margin: 4rem auto;
  width: 120rem;
}

.overview oz-markdown {
  font-family: Roboto;
  color: #ECECEC;
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 2.25rem;
  flex: 0 0 30%;
}

.overview oz-markdown oz-code {
  font-size: 1.5rem;
  flex: none;
}

.overview oz-code {
  flex: 0 0 70%;
}

.markdown {
  grid-area: markdown;
  font-family: Roboto;
  color: #ECECEC;
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 2.25rem;
  flex: 0 0 30%;
}

.code {
  grid-area: code;
  height: 100%;
  width: 100%;
}

.result {
  grid-area: result;
}

footer {
  text-align: center;
  color: #ECECEC;
  padding: 2.5rem;
  grid-area: footer;
}
`

const template = _ => poz`
img.logo(src="/assets/imgs/logo.svg")
a.github(href="https://github.com/Banou26/ozjs" target="_blank" rel="noopener")
a.discord(href="https://discord.gg/BBnGvYQ" target="_blank" rel="noopener")
h1
  span Oz.js,
  span.title-placeholder Progressive Javascript Framework
  img.placeholder-loading-icon(src="/assets/imgs/loading.svg")
router-link.to-guide(to="guide") Guide
router-link.to-api(to="api") API
oz-markdown.markdown(value=${overview.markdown})
oz-code.code(html=${'<script src="/assets/code-result-bundle.js"></script>' + overview.style} language="javascript" editable="true" result=${ref('result')} value=${overview.code})
iframe.result(frameborder="0" ${ref('result')})
footer Released under the MIT License<br>Copyright © 2018 Dias-Santos Thomas
`

const Index = {
  name: 'app-index',
  state: _ => ({
    titleLoading: true,
    interval: undefined
  }),
  template,
  style,
  connected: ({state}) => (state.interval = setInterval(_ => (state.loading = !state.loading), 2500)),
  disconencted: ({state: {interval}}) => clearInterval(interval)
}

export default registerElement(Index)

export {
  // Header,
  Code,
  Markdown
}
