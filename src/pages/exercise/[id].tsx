// import { useRouter } from 'next/router'
// import { useForm } from 'react-hook-form'
import { trpc } from '../../utils/trpc'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Metronome from '../../components/Metronome'
import Header from '../../components/Header'

export default function ExercisePractice ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(params)

  const { data, isSuccess, isLoading } = trpc.useQuery(['exercise.byId', { id: params.id }])

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

// function PracticeForm () {
//   const { register, handleSubmit } = useForm()
//   return <form>
//     <label>
//       <input type="text" name="" id="" />
//     </label>
//   </form>
// }
