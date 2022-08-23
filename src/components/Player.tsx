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
      new Tone.PolySynth()
    ])
  }, [])

  if (gain && synths) synths.forEach(synth => synth.chain(gain))
  // synths[0].oscillator.type = 'fmtriangle'
  // synths[1].oscillator.type = 'fmsine'

  const presets = useMemo(() => ({
    inputs: [
      [0, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0]
    ],
    notes: ['A4', 'A5']
  }), [])

  let index = 0
  // console.log(bpm)

  const repeat = useCallback((time: number) => {
    const step = index % 8
    // Iterate through the synths/sounds to play
    for (let i = 0; i < 2; i++) {
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
    console.log({ toggleMetro, tone: Tone.Transport.loop })
    if (!toggleMetro) {
      if (Tone.Transport.state === 'started') return
      scheduleMetro()
      void Tone.start()
      // Tone.Transport.stop()
      Tone.Transport.start()
    } else {
      console.log('sla')
      Tone.Transport.cancel().toggle()
      index = 0
    }
    setToggleMetro(toggle => !toggle)
  }

  return <button className='start-stop' onClick={handleMetro}>{toggleMetro ? 'Stop' : 'Start'}</button>
}

export default Player
