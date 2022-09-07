/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import Header from '../../components/Header'
import { trpc } from '../../utils/trpc'

// TODO depending on the type of exercise (e.g. SCALE, TECHIQUE) allow different fields
//  SCALE -> Position mode
// TECHNIQUE -> Starting position
// etc.
interface Inputs {
  name: string
  tonic: string
  description: string
}

export default function New () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
  const mutation = trpc.useMutation(['exercise.createExercise'])
  const router = useRouter()

  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data)
    if (mutation.isSuccess) {
      await router.push('/dashboard')
    }
  }

  return (<>
    <Header />
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label className='block'>
        Exercie Name
        <input className={STYLES.INPUT} type='text' {...register('name', { required: true })} placeholder="spider" />
      </label>
      <label className='block'>
        Exercise Tonic
        <input className={STYLES.INPUT} type='text' {...register('tonic', { required: false })} placeholder="A" />
      </label>
      <label className='block'>
        Description
        <textarea className={STYLES.INPUT} {...register('description', { required: false })} placeholder="Brief explanation" />
      </label>
      <button type='submit' className='block'>Add</button>

    </form>
  </>)
}

const STYLES = {
  INPUT: 'ml-2 py-2 px-2 rounded dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:dark:text-slate-200 dark:placeholder-slate-500'
}
