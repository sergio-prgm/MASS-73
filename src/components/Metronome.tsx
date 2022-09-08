import { useEffect, useState } from 'react'
import * as Tone from 'tone'

import Player from './Player'
import { PlusSVG, MinusSVG } from './SVG'

// TODO make bpm and ts react to Tone and not the other way around

interface MetronomeProps {
  baseBPM?: number
  baseTS?: number
}

function Metronome ({ baseBPM, baseTS }: MetronomeProps) {
  if (typeof baseBPM === 'number') {
    Tone.Transport.bpm.value = baseBPM
    if (baseBPM < 20) baseBPM = 120
  }

  return <>
    <BPM baseBPM={baseBPM} />
    <Player />
    <TimeSignature baseTS={baseTS} />
  </>
}

export default Metronome

function BPM ({ baseBPM = 110 }) {
  const [bpm, setBpm] = useState(baseBPM)
  const maxBPM = 280
  const minBPM = 20
  const BPMV = Tone.Transport.bpm?.value

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm, setBpm])

  return (<>
    <div className='w-full text-center font-bold mb-3' id="bpm-display">
      <span className='text-6xl' id="tempo">{BPMV.toLocaleString()}</span>
      <span className='dark:text-violet-300 text-violet-500' id="bpm">BPM</span>
    </div>
    <div className='text-sm uppercase text-center mb-6' id="tempo-text">vivace</div>
    <div className='flex grow-0 justify-between items-center gap-2 mb-4' id="tempo-settings">
      <button
        onClick={(e) => { bpm > minBPM && setBpm(bpm => bpm - 1) }}
        className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo decrease"
      >
        <MinusSVG color='white' height={20} width={20}/>
        {/* <img src='/SVG/Minus.svg' alt='Minus icon' width={20} height={20}/> */}
      </button>
      <input type="range" min={minBPM} max={maxBPM} step="1"
        onInput={e => setBpm(Number.parseInt((e.target as HTMLInputElement).value))}
        className=''
        value={BPMV}
      />
      <button
        onClick={(e) => { bpm < maxBPM && setBpm(bpm => bpm + 1) }}
        className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo increase">
        <PlusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Plus.svg' alt='Plus icon' width={20} height={20}/> */}
      </button>
    </div>
  </>)
}

function TimeSignature ({ baseTS = 4 }) {
  const [ts, setTs] = useState(baseTS)
  const maxTS = 9
  const minTS = 2

  useEffect(() => {
    Tone.Transport.timeSignature = ts
    // console.log(Tone.Transport.timeSignature)
  }, [ts, setTs])

  return (<>
    <div className='flex grow-0 justify-between items-center gap-2 mb-4' id="measures">
      <button
        onClick={() => ts > minTS && setTs(ts => ts - 1)}
        className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo decrease"
      >
        <MinusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Minus.svg' alt='Minus icon' width={20} height={20}/> */}
      </button>
      <div className="measure-count">{ts}</div>
      <button
        onClick={() => ts < maxTS && setTs(ts => ts + 1)}
        className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo decrease"
      >
        <PlusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Plus.svg' alt='Minus icon' width={20} height={20}/> */}
      </button>
    </div>
    <span className="beats-per-measure">Beats per measure</span>
  </>)
}
