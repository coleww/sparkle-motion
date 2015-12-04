var makeDistortionCurve = require('make-distortion-curve')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var oscillator1 = ac.createOscillator(ac)
  oscillator1.type = 'triangle'
  var oscillator2 = ac.createOscillator(ac)
  oscillator2.type = 'triangle'
  var oscillator3 = ac.createOscillator(ac)
  oscillator3.type = 'triangle'
  var oscillator4 = ac.createOscillator(ac)
  oscillator4.type = 'triangle'
  var oscillator5 = ac.createOscillator(ac)
  oscillator5.type = 'sine'
  var oscillator6 = ac.createOscillator(ac)
  oscillator6.type = 'sine'


  var delayA = ac.createDelay(0.222)

  var delayB = ac.createDelay(0.222)


  var delayC = ac.createDelay(0.222)

var filterA = ac.createBiquadFilter()
filterA.Q.value = 5
filterA.type = 'lowpass' // 'highpass', 'bandpass', 'lowpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'
filterA.detune.value = 0

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionA = ac.createWaveShaper()
distortionA.curve = makeDistortionCurve(100)

var filterB = ac.createBiquadFilter()
filterB.Q.value = 5
filterB.type = 'lowpass' // 'highpass', 'bandpass', 'lowpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'
filterB.detune.value = 0

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionB = ac.createWaveShaper()
distortionB.curve = makeDistortionCurve(100)

var filterC = ac.createBiquadFilter()
filterC.Q.value = 5
filterC.type = 'lowpass' // 'highpass', 'bandpass', 'lowpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'
filterC.detune.value = 0

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionC = ac.createWaveShaper()
distortionC.curve = makeDistortionCurve(100)








var filterZ = ac.createBiquadFilter()
filterZ.Q.value = 5
filterZ.type = 'lowpass' // 'highpass', 'bandpass', 'lowpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'
filterZ.detune.value = 0

// that one distortion curve that everyone copy pastes from stack overflow anyways

var delayZ = ac.createDelay(0.122)

// make a distortion pedal! yay!
var distortionZ = ac.createWaveShaper()
distortionZ.curve = makeDistortionCurve(100)

  // SOMEONE
  // SHOULD
  // MAKE
  // A
  // MODULE
  // THAT
  // JUST
  // MIXES
  // STUFF
  // PLZ.
  var panL = ac.createStereoPanner()
  panL.pan.value = -0.15
  var panR = ac.createStereoPanner()
  panR.pan.value = 0.15

  var volume = ac.createGain()
  volume.gain.value = 0.75

  //  START OF CHAIN (NOT MARKOV)

  oscillator1.connect(delayA)
  oscillator5.connect(delayA)

  oscillator4.connect(delayB)
  oscillator6.connect(delayB)

  oscillator2.connect(delayC)
  oscillator3.connect(delayC)

  delayA.connect(filterA)
  delayB.connect(filterB)
  delayC.connect(filterC)
  filterA.connect(distortionA)
  filterB.connect(distortionB)
  filterC.connect(distortionC)
  oscillator1.connect(distortionA)
  oscillator5.connect(distortionA)

  oscillator4.connect(distortionB)
  oscillator6.connect(distortionB)

  oscillator2.connect(distortionC)
  oscillator3.connect(distortionC)



  distortionC.connect(delayZ)
  delayZ.connect(filterZ)
  distortionC.connect(distortionZ)
  filterZ.connect(distortionZ)

// DELAYS FOR THE DELAY GOD!
// REVERB UNTO THE REVERB GODDESS!
  panL.connect(volume)
  panR.connect(volume)
  distortionZ.connect(volume)
  // END OF CHAIN



  audioNodes.oscillator1 = oscillator1
  audioNodes.oscillator2 = oscillator2
  audioNodes.oscillator3 = oscillator3
  audioNodes.oscillator4 = oscillator4
  audioNodes.oscillator5 = oscillator5
  audioNodes.oscillator6 = oscillator6
  audioNodes.delayA = delayA
  audioNodes.delayB = delayB
  audioNodes.volume = volume
  // ...

  audioNodes.settings = {
    attack: 0.1,
    decay: 0.05,
    sustain: 0.3,
    release: 0.1,
    arpeggio: false, // lol jk not yet, lazy
    chord: 'maj7' // or maybe 'pentMin5' ? how does science?

  }

 oscillator1.start(ac.currentTime)
 oscillator2.start(ac.currentTime)
 oscillator3.start(ac.currentTime)
 oscillator4.start(ac.currentTime)
 oscillator5.start(ac.currentTime)
 oscillator6.start(ac.currentTime)

  return {
    connect: function (input) {
      // TODO: HOW 2 STEREO
        audioNodes.volume.connect(input)
    },
    start: function (when) {
      // FAKE ADSR
      // NOT SCIENTIFIC
      // WIKIPEDIA? IDK, W/E
      audioNodes.volume.gain.linearRampToValueAtTime(audioNodes.settings.sustain + 0.2, when + audioNodes.settings.attack)
      audioNodes.volume.gain.linearRampToValueAtTime(audioNodes.settings.sustain, when + audioNodes.settings.decay)
      audioNodes.volume.gain.linearRampToValueAtTime(0, when + audioNodes.settings.release)
    },
    stop: function (when) {
      console.log('SOMETIMES I DOUBT YR COMMITMENT 2 SPARKLE MOTION\np.s. yr oscillators are destroyed, make a new synth plz')
      oscillator1.stop(when)
      oscillator2.stop(when)
      oscillator3.stop(when)
      oscillator4.stop(when)
      oscillator5.stop(when)
      oscillator6.stop(when)
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, attack: , decay: , sustain: , release: }
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v

          audioNodes.oscillator1.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator2.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator3.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator4.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator5.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator6.frequency.setValueAtTime(freq, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    // import: function (opts) {
    //   // optional: sets opts data on all audioNodes at ac.currentTime
    //   Object.keys(opts).forEach(function (k) {
    //     var v = opts[k]
    //     // ????
    //   })
    // },
    // export: function () {
    //   // optional: returns object representation of the instruments current attributes, to be passed as opts to it's constructor or import function
    //   return {
    //     // ????
    //   }
    // },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}