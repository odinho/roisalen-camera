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
    setInterval(this.fetch_subject.bind(this), 1000)
    setInterval(this.fetch_speakerlist.bind(this), 400)
  }
  fetch_subject() {
    Model.fetch('subject', false)
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
      .then(speakers_data => {
        let speaker
        for (const s of speakers_data) {
          if (s.speaking)
            speaker = s
          else {
            speaker = (s.replies||[]).find(r => r.speaking)
            if (speaker)
              speaker.is_reply = true
          }
          if (speaker)
            break
        }
        if (this.speaker && speaker && this.speaker.number == speaker.number &&
            this.speaker.is_reply == speaker.is_reply) {
          return
        }
        if (!this.speaker && !speaker)
          return
        this.speaker = speaker
        const ev = new CustomEvent('_newspeaker', {detail: speaker})
        this.speakers.forEach(s => s.dispatchEvent(ev))
    })
  }
  static fetch(api, json = true) {
    return fetch(`/rest/${api}`,
        {headers: {'X-organisation': 'mdgoslo'}})
      .then(res=>{
          if (!res.ok) {
              if (api === 'subject') {
                  return "Møte"
              }
              if (api === 'speakerList') {
                  return [
                      {
                          group: "Gruppe",
                          name: "Person",
                          number: 1,
                          speaking: true,
                      }
                  ]
              }
              console.error("fetch error", res)
              throw res
          }
          return json ? res.json() : res.text()
      })
  }
}
