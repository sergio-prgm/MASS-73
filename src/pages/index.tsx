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

      <div className='h-screen px-2 sm:px-4 max-w-2xl mx-auto'>
        <Header />
        <div className="dark:text-slate-100 text-slate-600 text-center">
          {/* <h1>Metronome</h1> */}
          <div className="m-0 mt-60 flex justify-center items-center w-full" id='container'>
            <div id="metronome" className='flex flex-col w-[500px] justify-between'>
              <Metronome />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
