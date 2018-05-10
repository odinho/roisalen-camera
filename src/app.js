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
        left: 0;
        position: absolute;
        right: 0;
      }
      roi-subject {
        top: 4vw;
        left: 4vw;
        position: absolute;
      }
      </style>
      <roi-subject value="Sak 5 - Whatever" />
      <roi-speaker name="Odin Hørthe" group="England" number=2 />
    `
  }
}

App.define('roi-app');
