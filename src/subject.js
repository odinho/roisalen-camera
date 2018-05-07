import HyperHTMLElement from 'hyperhtml-element/esm'

class Subject extends HyperHTMLElement {
  static get observedAttributes() { return ['value'] }
  get defaultState() {
    return {
      value: this.value || '',
    }
  }
  created() {
    this.attachShadow({mode: 'open'})
    this.render()
  }
  render() {
    const state = this.state
    this.html`
      <style>
      h1 {
        background: #6A9325;
        color: white;
        display: inline-block;
        font-size: 2.5vw;
        font-weight: 600;
        margin: 0 auto;
        opacity: 1;
        padding: 0 1vw;
      }
      </style>
      <h1 class>
        ${state.value}
      </h1>
    `
  }
}

Subject.define('roi-subject');
