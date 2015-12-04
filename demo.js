window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()
var synth = require('./')(ac)
// just connect and start the synth to make sure it plays, edit as needed!
synth.connect(ac.destination)

window.setInterval(function() {
  synth.update({midiNote: 40 + ~~(Math.random() * 15)}, ac.currentTime)
  synth.start(ac.currentTime)
}, 250)

window.setInterval(function() {
  synth.update({midiNote: 30 + ~~(Math.random() * 15)}, ac.currentTime)
  synth.start(ac.currentTime)
}, 150)

window.setInterval(function() {
  synth.update({midiNote: 70 + ~~(Math.random() * 15)}, ac.currentTime)
  synth.start(ac.currentTime)
}, 500)