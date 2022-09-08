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
    <div className='flex flex-wrap gap-2'>
      {
        data.map((exercise, index) => (
          <SessionCard key={index} {...exercise} />
        ))
      }
      <Link href='/exercise/new' >
        <a className='p-4 dark:bg-violet-50 dark:text-slate-900 rounded'>
          <h3>Add new exercise</h3>
          <PlusSVG color='black' height={40} width={40}/>
        </a>
      </Link>
    </div>
  </>)
}

function SessionCard ({ name, updatedAt, maxBPM, createdAt }: Exercise) {
  console.log('here', name)
  return (
    <article className='p-4 rounded dark:bg-violet-50 dark:text-slate-900'>
      <h3 className='font-semibold text-xl'>{name}</h3>
      <p>Highest BPM: <span className='font-bold'>{maxBPM}</span></p>
      <small className='block'>Created: {createdAt.toLocaleDateString()}</small>
      {
        updatedAt.toISOString() === new Date(0).toISOString()
          ? <small className='block'>Not yet practiced</small>
          : <small className='block'>Last session: {updatedAt.toLocaleDateString()}</small>
      }
    </article>)
}
// times practiced
