import HyperHTMLElement from 'hyperhtml-element/esm'

class Speaker extends HyperHTMLElement {
  static get observedAttributes() { return ['name', 'number', 'group'] }
  get defaultState() {
    return {
      speaker: {
        name: this.name || '',
        number: this.number || '',
        group: this.group || '',
      },
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
  update(speaker) {
    const upd = {
      updating: true,
      is_hidden: true,
      upd_speaker: speaker,
    }
    // If hidden and we're not updating, transition won't fire
    // to swap upd to new, just start showing it
    if (speaker && !this.state.updating && this.state.is_hidden)
      Object.assign(upd, {is_hidden: false, speaker})
    this.setState(upd)
  }
  ontransitionend(ev) {
    if (ev.propertyName !== 'opacity' || !this.state.updating)
      return
    const {upd_speaker, is_hidden} = this.state
    const upd = {}
    if (!is_hidden || (is_hidden && !upd_speaker))
      Object.assign(upd, {updating: false})
    else {
      Object.assign(upd, {
        speaker: upd_speaker,
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
          <div class=name>${state.speaker.name}</div>
        </div>
        <div class=underbox>
          <div class=number>${state.speaker.number}</div>
          <div class=group>${state.speaker.group}</div>
          <div class=reply>${state.speaker.is_reply ? 'replikk' : ''}</div>
        </div>
      </div>
    `
  }
}

Speaker.define('roi-speaker');
