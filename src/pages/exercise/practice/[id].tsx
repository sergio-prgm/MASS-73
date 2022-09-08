/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from 'next/router'
import * as Tone from 'tone'
import { trpc } from '../../../utils/trpc'

import Metronome from '../../../components/Metronome'
import Header from '../../../components/Header'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useState } from 'react'

// TODO close modal when clicking outside

// TODO Save a practice session
// [ ] Allow Notes/Observations about each practice session
// [x] Start with a form to stablish baseBPM/TargetBPM/TS/Duration/etc.

interface FormData {
  duration: number
  // notes: string
  baseBPM: number
  targetBPM: number
}

export default function ExercisePractice () {
  const [toggleForm, setToggleForm] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    duration: 5,
    baseBPM: 20,
    targetBPM: 30
  })
  const router = useRouter()
  const id = typeof router.query?.id === 'string' ? router.query.id : ''
  const { data, isSuccess, isLoading } = trpc.useQuery(['exercise.byId', { id }], { refetchOnWindowFocus: false })

  // useEffect(() => {
  //   if (formData?.baseBPM) Tone.Transport.bpm.value = formData.baseBPM
  // }, [formData])

  console.log('[[from Daddy]]', formData)
  if (isLoading) {
    return <p>...loading</p>
  }

  if (isSuccess) {
    // const { baseBPM } = data
    // setFormData(formData => ({ duration: 4, baseBPM, targetBPM: baseBPM + 20 }))
    return (
      <>
      <Header />
      <div className="dark:text-slate-100 text-slate-600 text-center">
        <h2 className='font-bold dark:text-violet-300'>{data.name}</h2>

        <button className='py-2 px-3 dark:bg-slate-800 dark:text-slate-200 rounded' onClick={() => setToggleForm(toggle => !toggle)}>
          Practice settings
        </button>
        {toggleForm && <PracticeForm formData={formData} setToggleForm={setToggleForm} setFormData={setFormData} />}

        <div className="m-0 flex justify-center items-center h-screen w-full" id='container'>
          <div id="metronome" className='flex flex-col w-[500px] justify-between'>
            <Metronome baseBPM={formData?.baseBPM}/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

function PracticeForm ({ formData, setToggleForm, setFormData }:
{
  formData: FormData
  setToggleForm: Dispatch<SetStateAction<boolean>>
  setFormData: Dispatch<SetStateAction<FormData>>}) {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setToggleForm(toggle => !toggle)
    Tone.Transport.bpm.value = data.baseBPM
    // if (data.baseBPM >= data.targetBPM) console.log('Are you sure you want your base and your target BPM to be the same')
    setFormData(data)
  }

  const { baseBPM, targetBPM, duration } = formData

  return (
    <div
      className='overflow-y-auto bg-green-200/25 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full'>
      <div
        className='relative mt-44 max-w-prose h-full mx-auto md:h-auto'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          // className='bg-slate-300 max-w-prose mx-auto rounded-md py-3 px-5'
          className='relative bg-slate-300 rounded-md py-4 px-6'
        >
          <label className='flex justify-between mx-auto text-slate-900 font-bold w-3/5'>
            Base BPM
            <input
              className='bg-slate-400 text-center inline-block w-12 rounded px-2 py-1 appearance-none outline-none'
              max={280}
              min={20}
              type='number' {...register('baseBPM', { required: true })} defaultValue={baseBPM} />
          </label>
          <input type='range' />
          <label className='flex justify-between mx-auto text-slate-900 font-bold w-3/5'>
            Target BPM
            <input
              className='bg-slate-400 text-center inline-block w-12 rounded px-2 py-1 appearance-none outline-none'
              max={280}
              min={20}
              type='number' {...register('targetBPM', { required: true })} defaultValue={targetBPM} />
          </label>
          <label className='flex justify-between mx-auto text-slate-900 font-bold w-3/5'>
            <p>Practice duration <small>(in minutes)</small></p>
            <input
              className='bg-slate-400 text-center inline-block w-12 rounded px-2 py-1 appearance-none outline-none'
              min={0}
              type='number' {...register('duration', { required: true })} defaultValue={duration} />
          </label>
          <button
            className='py-2 px-3 bg-violet-300 font-semibold text-slate-800 rounded' type='submit'>
            Apply
          </button>
        </form>
      </div>
    </div>
  )
}
