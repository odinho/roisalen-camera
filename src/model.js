export default class Model {
  constructor({speakers, subjects}) {
    this.speakers = speakers
    this.subjects = subjects

    this.speaker_list = null
    this.speaker = null
    this.start()
  }
  start() {
    setInterval(this.fetch_speakerlist.bind(this), 1000)
  }
  fetch_speakerlist() {
    Model.fetch('speakerList').then(speakers_data => {
        let speaker
        for (const s of speakers_data) {
          if (s.speaking)
            speaker = s
          else
            speaker = (s.replies||[]).find(r => r.speaking)
          if (speaker)
            break
        }
        if (this.speaker && this.speaker.number == speaker.number)
          return
        this.speaker = speaker
        const ev = new CustomEvent('_newspeaker', {detail: speaker})
        this.speakers.forEach(s => s.dispatchEvent(ev))
    })
  }
  static fetch(api) {
    return fetch(`https://roisalen.no/rest/${api}`,
        {headers: {'X-organisation': 'MDG'}})
        .then(res=>res.json())
  }
}
