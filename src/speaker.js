import HyperHTMLElement from 'hyperhtml-element/esm'

class Speaker extends HyperHTMLElement {
  static get observedAttributes() { return ['name'] }
  created() {
    this.attachShadow({mode: 'open'})
    this.render()
  }
  render() {
    this.html`
      <style>
      div { background: green }
      </style>
      <div>name: ${this.name}</div>`
  }
}

Speaker.define('roi-speaker');
