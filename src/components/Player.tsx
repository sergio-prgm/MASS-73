import * as Tone from 'tone'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { Frequency } from 'tone/build/esm/core/type/Units'

function Player () {
  const [toggleMetro, setToggleMetro] = useState(false)
  const [gain, setGain] = useState<Tone.Gain<'gain'>>()
  const [synths, setSynths] = useState<Tone.PolySynth[]>()

  useEffect(() => {
    setGain(new Tone.Gain(0.3).toDestination())
    setSynths([
      new Tone.PolySynth(),
      new Tone.PolySynth(),
      new Tone.PolySynth() // Added for subdivisions
    ])
  }, [])

  if (gain && synths) synths.forEach(synth => synth.chain(gain))
  // synths[0].oscillator.type = 'fmtriangle'
  // synths[1].oscillator.type = 'fmsine'

  const presets = useMemo(() => ({
    inputs: [
      [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1] // Added for subdivisions
    ],
    notes: ['A4', 'A5', 'F3']
  }), [])

  let index = 0
  // [ ] To make the subdivisions, different inputs[] might have to be created (mainly one for triplets)

  const repeat = useCallback((time: number) => {
    console.log('changed')
    const step = index % (Number(Tone.Transport.timeSignature) * 2)
    console.log(Tone.Transport.timeSignature)

    // Iterate through the synths/sounds to play
    for (let i = 0; i < 2; i++) { // Change the 2 to a 3 to make duplet subdivisions
      if (synths) {
        const synth = synths[i]
        const note = presets.notes[i]
        // let row = rows[i
        const inputArr = presets.inputs[i]
        const input = inputArr
          ? inputArr[step]
          : 0
        if (input) synth?.triggerAttackRelease(note as Frequency, '32n', time)
      }
    }
    index++
  }, [index, presets.inputs, presets.notes, synths])

  const scheduleMetro = useCallback(() => {
    const id = Tone.Transport.scheduleRepeat(repeat, '8n')
    return id
  }, [repeat])

  // timeSignature

  const handleMetro = () => {
    if (!toggleMetro) {
      if (Tone.Transport.state === 'started') return
      scheduleMetro()
      void Tone.start()
      // Tone.Transport.stop()
      Tone.Transport.start()
    } else {
      Tone.Transport.cancel().toggle()
      index = 0
    }
    setToggleMetro(toggle => !toggle)
  }

  return <button className='
    py-3 rounded uppercase text-xl font-semibold
    bg-violet-600 dark:bg-violet-200
    text-slate-50 dark:text-slate-700
    hover:bg-violet-700 dark:hover:bg-violet-300
    active:bg-violet-800 dark:active:bg-violet-400' id='start-stop' onClick={handleMetro}>{toggleMetro ? 'Stop' : 'Start'}</button>
}

export default Player
