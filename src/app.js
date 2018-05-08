import './speaker.js'
import './subject.js'
import HyperHTMLElement from 'hyperhtml-element/esm'

class App extends HyperHTMLElement {
  created() {
    let i = 0;
    const upd_test = ()=>{
      i++
      if ((i%2)==0)
        this.querySelector('roi-subject').update('Test '+i)
      this.querySelector('roi-speaker').update({
        name: `Helene ${i}`,
        number: 37,
        group: 'Oslo',
      })
      setTimeout(upd_test, 6000-(i<4 ? i : 0)*1000)
      this.render()
    };
    setTimeout(upd_test, 1000)
    this.render()
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
