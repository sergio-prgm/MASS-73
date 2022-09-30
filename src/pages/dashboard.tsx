import { useSession } from 'next-auth/react'
import { Exercise } from '@prisma/client'
import Link from 'next/link'
import { useEffect } from 'react'
import Header from '../components/Header'
import PlusSVG from '../components/PlusSVG'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'

export default function Dashboard () {
  const { data } = trpc.useQuery(['exercise.all'], { refetchOnWindowFocus: false })
  const router = useRouter()
  const { status } = useSession({
    required: true,
    async onUnauthenticated () {
      await router.push('/')
    }
  })
  useEffect(() => {
    console.log('main dashboard')
  }, [data])
  if (!data) {
    return <div>Loading...</div>
  }

  return (<>
    <Header />
    <div
      className='grid grid-cols-1 sm:grid-cols-2 max-w-xs sm:max-w-xl mx-auto justify-center gap-4 px-2'>
      {
        data.map((exercise, index) => (
          <SessionCard key={index} {...exercise} />
        ))
      }
      <Link href='/exercise/new' >
        <a className='p-4 rounded
        w-full
        dark:bg-violet-50 dark:text-slate-900 dark:shadow-none
        bg-violet-200 shadow-lg text-slate-800'>
          <h3 className=''>Add new exercise</h3>
          <div className='content-center h-[80%] flex justify-center items-center'>
            <PlusSVG color='black' height={40} width={40}/>
          </div>
        </a>
      </Link>
    </div>
  </>)
}

function SessionCard ({ name, updatedAt, maxBPM, createdAt, id }: Exercise) {
  // console.log('here', name)
  return (
    <article
      className='p-4 flex justify-between flex-col gap-3 rounded
        w-full
        dark:bg-violet-50 dark:text-slate-900 dark:shadow-none
        bg-violet-200 shadow-lg text-slate-800'>
      <div className=''>
        <h3 className='font-semibold text-xl'>{name}</h3>
        <p>Highest BPM: <span className='font-bold'>{maxBPM}</span></p>
        <small className='block'>Created: {createdAt.toLocaleDateString()}</small>
        {
          updatedAt.toISOString() === new Date(0).toISOString()
            ? <small className='block'>Not yet practiced</small>
            : <small className='block'>Last session: {updatedAt.toLocaleDateString()}</small>
        }
      </div>
      <Link href={`/exercise/practice/${id}`}>
        <a
          className='dark:bg-slate-800 dark:text-slate-200
          bg-violet-400 text-slate-800
          font-medium rounded text-center py-2 block'>Practice</a>
      </Link>
    </article>
  )
}
// times practiced
