import HyperHTMLElement from 'hyperhtml-element/esm'

class Speaker extends HyperHTMLElement {
  static get observedAttributes() { return ['name', 'number', 'group'] }
  get defaultState() {
    return {
      name: this.name || '',
      number: this.number || '',
      group: this.group || '',
      is_hidden: this.is_hidden,
      updating: false,
    }
  }
  created() {
    this.attachShadow({mode: 'open'})
    this.addEventListener('_newspeaker', this)
    this.render()
  }
  on_newspeaker({detail}) {
    this.update(detail)
  }
  update({name, number, group}) {
    const upd = {
      updating: true,
      is_hidden: true,
      upd_name: name,
      upd_number: number,
      upd_group: group,
    }
    // If hidden and we're not updating, transition won't fire
    // to swap upd to new, just start showing it
    if (!this.state.updating && this.state.is_hidden)
      Object.assign(upd, {is_hidden: false, name, number, group})
    this.setState(upd)
  }
  ontransitionend(ev) {
    if (ev.propertyName !== 'opacity' || !this.state.updating)
      return
    const {upd_name, upd_number, upd_group, is_hidden} = this.state
    const upd = {}
    if (!is_hidden || (is_hidden && !upd_name))
      Object.assign(upd, {updating: false})
    else {
      Object.assign(upd, {
        name: upd_name,
        number: upd_number,
        group: upd_group,
        is_hidden: false,
      })
    }
    this.setState(upd)
  }
  render() {
    const state = this.state
    this.html`
      <style>
      .box {
        font-weight: 600;
        margin: 0 auto;
        opacity: 1;
        position: relative;
        right: 0;
        transition: 0.5s opacity, 0.5s right;
      }
      .topbox {
        background: #6A9325;
        color: white;
        font-size: 3vw;
        padding: 0 1vw;
      }
      .underbox {
        color: #333;
        display: inline-block;
        font-size: 2.2vw;
        margin-top: 0.5vw;
      }
      .underbox > div {
        background: #fff;
        display: inline-block;
        padding: 0 1vw;
      }
      .hidden {
        opacity: 0.0001;
        right: -2vw;
      }
      </style>
      <div ontransitionend=${this}
          class=${'box' + (state.is_hidden ? ' hidden' : '')}>
        <div class=topbox>
          <div class=name>${state.name}</div>
        </div>
        <div class=underbox>
          <div class=number>${state.number}</div>
          <div class=group>${state.group}</div>
        </div>
      </div>
    `
  }
}

Speaker.define('roi-speaker');
