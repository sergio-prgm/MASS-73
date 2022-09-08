import { useRouter } from 'next/router'
// import { useForm } from 'react-hook-form'
import { trpc } from '../../utils/trpc'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Header from '../../components/Header'
import Link from 'next/link'

// TODO this page should show the exercise's history (graph, max, base, created...)
//      && create a new page for the practice session

export default function ExercisePractice ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const id = typeof router.query?.id === 'string' ? router.query.id : ''
  const { data, isSuccess, isLoading } = trpc.useQuery(['exercise.byId', { id }], { refetchOnWindowFocus: false })

  if (isLoading) {
    return (
      <>
        <Header />
        <p>...loading</p>
      </>
    )
  }

  if (isSuccess) {
    return (
      <>
      <Header />
      <div className="dark:text-slate-100 text-slate-600 text-center">
        <h2 className='font-bold dark:text-violet-300'>{data.name}</h2>

      </div>
      <Link href={`/exercise/practice/${id}`}>
        <a className='dark:bg-slate-700 dark:text-violet-200 font-medium py-2 px-3 rounded mx-auto'>New practice</a>
      </Link>
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
