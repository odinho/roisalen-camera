import './speaker.js'
import './subject.js'

document.addEventListener('DOMContentLoaded', ()=>{
  let i = 0;
  let upd_test = ()=>{
    i++
    document.querySelector('roi-speaker').update({
      name: `Helene ${i}`,
      number: 37,
      group: 'Oslo',
    })
    if (i<4)
        setTimeout(upd_test, 2000-(i*250))
  };
  setTimeout(upd_test, 1000)
})
