// import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '../components/Header'

const MOCK_SESSION = [
  { title: 'C Major Scale', lastModified: new Date(2022, 8, 29), highestBPM: 120 },
  { title: 'Spider', lastModified: new Date(2022, 8, 27), highestBPM: 135 }
]

export default function Dashboard () {
  // const { data: session } = useSession()
  return (<>
    {/* <p>Name: {session?.user?.name}</p> */}
    {/* <p>Id: {session?.user?.id}</p>
    <p>Email: {session?.user?.email}</p> */}
    <Header />
    <div className='flex flex-wrap gap-2'>
      {
        MOCK_SESSION.map((sess, index) => (
          <SessionCard key={index} title={sess.title} highestBPM={sess.highestBPM} lastModified={sess.lastModified} />
        ))
      }
      <Link href='/exercise/new' >
        <a className='p-4 dark:bg-violet-50 dark:text-slate-900 rounded'>
          <h3>Add new exercise</h3>
          <img src='/SVG/PlusDark.svg' alt='Plus icon' width={40} height={40} className='mx-auto' />
        </a>
      </Link>
    </div>
  </>)
}

function SessionCard ({ title, lastModified, highestBPM }: typeof MOCK_SESSION[number]) {
  return (
    <article className='p-4 rounded dark:bg-violet-50 dark:text-slate-900'>
      <h3 className='font-semibold text-xl'>{title}</h3>
      <p>Highest BPM: <span className='font-bold'>{highestBPM}</span></p>
      <small>Last session: {lastModified.toLocaleDateString()}</small>
    </article>)
}
