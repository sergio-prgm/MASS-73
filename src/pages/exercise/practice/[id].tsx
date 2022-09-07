import { useRouter } from 'next/router'
// import { useForm } from 'react-hook-form'
import { trpc } from '../../../utils/trpc'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Metronome from '../../../components/Metronome'
import Header from '../../../components/Header'

// TODO this page should show the exercise's history (graph, max, base, created...)
//      && create a new page for the practice session
// TODO Save a practice session
// [ ] Allow Notes/Observations about each practice session
// [ ] Start with a form to stablish baseBPM/TargetBPM/TS/Duration/etc.

export default function ExercisePractice ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const id = typeof router.query?.id === 'string' ? router.query.id : ''
  const { data, isSuccess, isLoading } = trpc.useQuery(['exercise.byId', { id }], { refetchOnWindowFocus: false })

  if (isLoading) {
    return <p>...loading</p>
  }

  if (isSuccess) {
    return (
      <>
      <Header />
      <div className="dark:text-slate-100 text-slate-600 text-center">
        <h2 className='font-bold dark:text-violet-300'>{data.name}</h2>

        <div className="m-0 flex justify-center items-center h-screen w-full" id='container'>
          <div id="metronome" className='flex flex-col w-[500px] justify-between'>
            <Metronome baseBPM={data.maxBPM}/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      params
    }
  }
}
