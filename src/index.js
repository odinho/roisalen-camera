import './speaker.js'
import './subject.js'

document.addEventListener('DOMContentLoaded', ()=>{
  let i = 0;
  let upd_test = ()=>{
    i++
    document.querySelector('roi-subject').update('Test '+i)
    document.querySelector('roi-speaker').update({
      name: `Helene ${i}`,
      number: 37,
      group: 'Oslo',
    })
    if (i<2)
        setTimeout(upd_test, 6000-(i*1000))
  };
  setTimeout(upd_test, 1000)
})
