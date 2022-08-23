import type { NextPage } from 'next'
import Head from 'next/head'
import * as Tone from 'tone'
import Player from '../components/Player'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Metro-73 App</title>
        <meta
          name="description"
          content="The best APP to practice music and keep track of your progress"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="App">
      <h1>Metronome</h1>
        <div className="container">
          <div className="metronome">
            <BPM />
            <Player />
            <div className="measures">
              <div className="subtract-beats stepper">-</div>
              <div className="measure-count">4</div>
              <div className="add-beats stepper">+</div>
            </div>
            <span className="beats-per-measure">Beats per measure</span>
          </div>

        </div>
    </div>
    </>
  )
}

function BPM () {
  const [bpm, setBpm] = useState(120)

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm, setBpm])

  return (<>
    <div className="bpm-display">
      <span className="tempo">{bpm}</span>
      <span className="bpm">BPM</span>
    </div>
    <div className="tempo-text">vivace</div>
    <div className="tempo-settings">
      <button
        onClick={(e) => { setBpm(bpm => bpm - 1) }}
        className="adjust-tempo decrease"
      >-
      </button>
      <input type="range" min="20" max="280" step="1"
        onInput={e => setBpm(Number.parseInt((e.target as HTMLInputElement).value))}
        className=''
        defaultValue={bpm}
      />
      <button
        onClick={(e) => { setBpm(bpm => bpm + 1) }}
        className="adjust-tempo increase">+</button>
    </div>
  </>)
}

export default Home
