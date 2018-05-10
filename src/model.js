export default class Model {
  constructor({speakers, subjects}) {
    this.speakers = speakers
    this.subjects = subjects
    this.listen()
  }
  listen() {
    Model.fetch('speakerList').then(speakers_data => {
        const speaker_data = speakers_data[0]
        const ev = new CustomEvent('_newspeaker', {detail: speaker_data})
        this.speakers.forEach(s => s.dispatchEvent(ev))
    })
  }
  static fetch(api) {
    return fetch(`https://roisalen.no/rest/${api}`,
        {headers: {'X-organisation': 'MDG'}})
        .then(res=>res.json())
  }
}
