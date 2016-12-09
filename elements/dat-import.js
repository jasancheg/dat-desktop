'use strict'

const yo = require('choo/html')
const icon = require('./icon')
const encoding = require('dat-encoding')
const css = require('sheetify')

css('dat-colors')

const prefix = css`
  :host {
    --input-height: 2rem;
    --icon-height: 1.2rem;

    position: relative;
    display: inline-block;
    padding: 0;
    border: 0;
  }

  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: .4rem;
    padding-left: .5rem;
    pointer-events: none;
    display: block;
    width: var(--icon-height);
    height: var(--icon-height);
    fill: var(--color-neutral-30);
  }

  .input {
    height: var(--input-height);
    width: 6.75rem;
    padding-right: .5rem;
    padding-left: 2rem;
    font-size: .75rem;
    border: 1px solid transparent;
    background-color: transparent;
    color: var(--color-neutral-30);
    opacity: 1;
    text-transform: uppercase;
    letter-spacing: .025em;
    transition-property: width;
    transition-duration: .15s;
    transition-timing-function: ease-in;
  }
  .input::-webkit-input-placeholder {
    color: var(--color-neutral-30);
    opacity: 1;
  }
  .input:hover::-webkit-input-placeholder {
    color: var(--color-white);
  }
  .input:hover + svg {
    fill: var(--color-white);
  }
  .input:focus,
  .input:active {
    width: 14rem;
    outline: none;
    background-color: var(--color-white);
    color: var(--color-neutral);
  }
  .input:focus::-webkit-input-placeholder,
  .input:active::-webkit-input-placeholder {
    color: var(--color-neutral-30);
  }
  .input:focus + svg,
  .input:active + svg {
    fill: var(--color-neutral-50);
  }
`

module.exports = (props) => {
  const keydown = (e) => {
    if (e.keyCode === 13) {
      const link = e.target.value
      try {
        encoding.decode(link)
      } catch (err) {
        throw new Error('Invalid link')
      }
      e.target.value = ''
      props.download(link)
    }
  }
  return yo`
    <label for="dat-import" class="${prefix}">
      <input name="dat-import" type="text" placeholder="Import dat" onkeydown=${keydown} class="input">
      <svg>
        <use xlink:href="#daticon-link" />
      </svg>
    </label>
  `
}
