import HyperHTMLElement from 'hyperhtml-element/esm'

class Speaker extends HyperHTMLElement {
  static get observedAttributes() { return ['name', 'number', 'group'] }
  created() {
    this.attachShadow({mode: 'open'})
    this.is_hidden = false
    setInterval(()=>{
        this.is_hidden = !this.is_hidden
        this.render()
      }, 4000)
    this.render()
  }
  render() {
    this.html`
      <style>
      .box {
        font-weight: 600;
        margin: 0 auto;
        opacity: 1;
        position: relative;
        top: 1px;
        transition: 0.5s all;
        width: 500px;
      }
      .topbox {
        background: #6A9325;
        color: white;
        font-size: 32px;
        padding: 4px 8px;
      }
      .underbox {
        color: #333;
        display: inline-block;
        font-size: 20px;
        margin-top: 4px;
      }
      .underbox > div {
        background: #fff;
        display: inline-block;
        padding: 0 10px;
      }
      .hidden {
        opacity: 0.0001;
        top: 50px;
      }
      </style>
      <div class=${'box' + (this.is_hidden ? ' hidden' : '')}>
        <div class=topbox>
          <div class=name>${this.name}</div>
        </div>
        <div class=underbox>
          <div class=number>${this.number}</div>
          <div class=group>${this.group}</div>
        </div>
      </div>
    `
  }
}

Speaker.define('roi-speaker');
