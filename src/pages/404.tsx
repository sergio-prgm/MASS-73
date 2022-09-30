import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function ErrorPage () {
  const { data, status } = useSession()
  return (
    <div className='h-screen flex align-middle'>
      <div className='text-center m-auto align-middle'>
        <p>Sorry <span className='font-semibold'>{
              data?.user?.name ?? ''
            }
          </span> this page doesn't exist.</p>
        <p>Go back {
          <Link
            href={status === 'authenticated'
              ? '/dashboard'
              : '/'
          }>
            <a className='font-semibold dark:text-violet-300 dark:hover:text-violet-400'>home</a>
          </Link>
        }.</p>
      </div>
    </div>
  )
}
