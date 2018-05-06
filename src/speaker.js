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
      .box {
        width: 500px;
        margin: 0 auto;
        background: #6A9325;
        color: white;
        font-size: 32px;
        font-weight: 600;
        padding: 4px 8px;
      }
      </style>
      <div class=box>${this.name}</div>
    `
  }
}

Speaker.define('roi-speaker');
