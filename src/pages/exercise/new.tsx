/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from 'react-hook-form'
import Header from '../../components/Header'

interface Inputs {
  name: string
  tonic: string
}

export default function New () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

  return (<>
    <Header />
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Exercie Name
        <input type='text' {...register('name', { required: true })} placeholder="spider" />
      </label>
      <label>
        Exercise Tonic
        <input type='text' {...register('tonic', { required: false })} placeholder="A" />
      </label>
      <button type='submit'>Add</button>

    </form>
  </>)
}
