import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Metronome from '../components/Metronome'

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

    <Header />
    <div className="dark:text-slate-100 text-slate-600 text-center">
      {/* <h1>Metronome</h1> */}
      <div className="m-0 flex justify-center items-center h-screen w-full" id='container'>
        <div id="metronome" className='flex flex-col w-[500px] justify-between'>
          <Metronome />
        </div>
      </div>
    </div>
    </>
  )
}

// function TimeSignature () {
//   const [ts, setTs] = useState(4)
//   const maxTS = 9
//   const minTS = 2

//   useEffect(() => {
//     Tone.Transport.timeSignature = ts
//     console.log(Tone.Transport.timeSignature)
//   }, [ts, setTs])

//   return (<>
//     <div className='flex grow-0 justify-between items-center gap-2 mb-4' id="measures">
//       <button
//         onClick={() => ts > minTS && setTs(ts => ts - 1)}
//         className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
//         id="adjust-tempo decrease"
//       >
//         <MinusSVG color='white' height={20} width={20} />
//         {/* <img src='/SVG/Minus.svg' alt='Minus icon' width={20} height={20}/> */}
//       </button>
//       <div className="measure-count">{ts}</div>
//       <button
//         onClick={() => ts < maxTS && setTs(ts => ts + 1)}
//         className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
//         id="adjust-tempo decrease"
//       >
//         <PlusSVG color='white' height={20} width={20} />
//         {/* <img src='/SVG/Plus.svg' alt='Minus icon' width={20} height={20}/> */}
//       </button>
//     </div>
//     <span className="beats-per-measure">Beats per measure</span>
//   </>)
// }

// function BPM () {
//   const [bpm, setBpm] = useState(120)
//   const maxBPM = 280
//   const minBPM = 20

//   useEffect(() => {
//     Tone.Transport.bpm.value = bpm
//   }, [bpm, setBpm])

//   return (<>
//     <div className='w-full text-center font-bold mb-3' id="bpm-display">
//       <span className='text-6xl' id="tempo">{bpm}</span>
//       <span className='dark:text-violet-300 text-violet-500' id="bpm">BPM</span>
//     </div>
//     <div className='text-sm uppercase text-center mb-6' id="tempo-text">vivace</div>
//     <div className='flex grow-0 justify-between items-center gap-2 mb-4' id="tempo-settings">
//       <button
//         onClick={(e) => { bpm > minBPM && setBpm(bpm => bpm - 1) }}
//         className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
//         id="adjust-tempo decrease"
//       >
//         <MinusSVG color='white' height={20} width={20}/>
//         {/* <img src='/SVG/Minus.svg' alt='Minus icon' width={20} height={20}/> */}
//       </button>
//       <input type="range" min={minBPM} max={maxBPM} step="1"
//         onInput={e => setBpm(Number.parseInt((e.target as HTMLInputElement).value))}
//         className=''
//         defaultValue={bpm}
//       />
//       <button
//         onClick={(e) => { bpm < maxBPM && setBpm(bpm => bpm + 1) }}
//         className='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
//         id="adjust-tempo increase">
//         <PlusSVG color='white' height={20} width={20} />
//         {/* <img src='/SVG/Plus.svg' alt='Plus icon' width={20} height={20}/> */}
//       </button>
//     </div>
//   </>)
// }

export default Home
