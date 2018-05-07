import './speaker.js'

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('root').innerHTML = `
    <roi-speaker name="Odin Hørthe" group="England" number=2></roi-speaker>`
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
