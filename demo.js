window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()
var synth = require('./')(ac)
// just connect and start the synth to make sure it plays, edit as needed!
synth.connect(ac.destination)
synth.update({midiNote: 62, attack: 0.15, decay: 0.2, sustain: 0.73, release: 1}, ac.currentTime)
synth.start(ac.currentTime)

synth.update({midiNote: 65, attack: 0.15, decay: 0.2, sustain: 0.73, release: 1}, ac.currentTime + 0.5)
synth.start(ac.currentTime + 1)

synth.update({midiNote: 60, attack: 0.15, decay: 0.2, sustain: 0.73, release: 1}, ac.currentTime + 1.5)
synth.start(ac.currentTime + 2)
console.log('howdy?')