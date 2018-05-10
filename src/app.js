import './speaker.js'
import './subject.js'
import Model from './model.js'
import HyperHTMLElement from 'hyperhtml-element/esm'

class App extends HyperHTMLElement {
  created() {
    this.render()
    const subjects = Array.from(this.querySelectorAll('roi-subject'))
    const speakers = Array.from(this.querySelectorAll('roi-speaker'))
    this.model = new Model({subjects, speakers})
  }
  render() {
    this.html`
      <style>
      roi-speaker {
        bottom: 4vw;
        position: absolute;
        right: 4vw;
      }
      roi-subject {
        top: 4vw;
        right: 4vw;
        position: absolute;
      }
      </style>
      <roi-subject />
      <roi-speaker />
    `
  }
}

App.define('roi-app');
