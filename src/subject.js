import HyperHTMLElement from 'hyperhtml-element/esm'

class Subject extends HyperHTMLElement {
  static get observedAttributes() { return ['value'] }
  get defaultState() {
    return {
      subject: this.value || '',
    }
  }
  created() {
    this.attachShadow({mode: 'open'})
    this.addEventListener('_newsubject', this)
    this.render()
  }
  on_newsubject({detail}) {
    this.update(detail)
  }
  update(subject) {
    let e = this.shadowRoot.querySelector('h1')
    e.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(1)', offset: 0.99},
        {transform: 'scale(0.6)'},
      ], {duration: Subject.DURATION, easing: 'ease-out'})
    this.setState({subject})
  }
  render() {
    const state = this.state
    this.html`
      <style>
      h1 {
        background: #6A9325;
        color: white;
        display: inline-block;
        font-size: 3.5vw;
        font-weight: 600;
        margin: 0 auto;
        opacity: 1;
        padding: 0 1vw;
        transform-origin: top right;
        transform: scale(0.6);
        will-change: transform;
      }
      </style>
      <h1>
        ${state.subject}
      </h1>
    `
  }
}

Subject.SCALE = 0.6
Subject.DURATION = 5000
Subject.define('roi-subject');
