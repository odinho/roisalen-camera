export default class Model {
  constructor({speakers, subjects}) {
    this.speakers = speakers
    this.subjects = subjects

    this.subject = null
    this.speaker = null
    this.start()
  }
  start() {
    this.fetch_subject()
    this.fetch_speakerlist()
    setInterval(this.fetch_subject.bind(this), 4000)
    setInterval(this.fetch_speakerlist.bind(this), 1000)
  }
  fetch_subject() {
    Model.fetch('subject')
      .then(res=>res.text())
      .then(subject => {
        if (this.subject != null && this.subject == subject)
          return
        this.subject = subject
        const ev = new CustomEvent('_newsubject', {detail: subject})
        this.subjects.forEach(s => s.dispatchEvent(ev))
    })
  }
  fetch_speakerlist() {
    Model.fetch('speakerList')
      .then(res=>res.json())
      .then(speakers_data => {
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
  }
}
