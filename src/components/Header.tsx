/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

// TODO show tooltip when hovering over user image

export default function Header () {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (status === 'authenticated') {
    return (
      <header className='flex flex-row justify-between items-center my-4'>
        <Link href='/dashboard' >
          <a>Dashboard</a>
        </Link>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <div>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className='px-5 py-2 rounded font-bold bg-slate-900 dark:bg-slate-50 text-slate-100 dark:text-slate-800 uppercase'
          >
            {theme === 'light' ? 'dark' : 'light'}
          </button>
        </div>
      {
        session?.user?.image
          ? <>
              <img src={session.user?.image} height={40} width={40} className='rounded' alt='profile picture' />
              <button className='py-2 px-5 rounded font-bold bg-rose-300 text-slate-800' onClick={
                () => signOut({ callbackUrl: '/api/auth/logout', redirect: false }) }>Sign out</button>
            </>
          : <>
              {/* <h2>Not logged!!</h2> */}
              <button className='py-2 px-5 rounded font-bold bg-violet-300 text-slate-800' onClick={() => signIn()}>Sign In</button>
          </>
      }
      </header>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <header className='flex flex-row justify-between items-center my-4'>
        <div>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className='px-5 py-2 rounded font-bold bg-slate-900 dark:bg-slate-50 text-slate-100 dark:text-slate-800 uppercase'
          >
            {theme === 'light' ? 'dark' : 'light'}
          </button>
        </div>
          <button className='py-2 px-5 rounded font-bold bg-violet-300 text-slate-800' onClick={() => signIn()}>Sign In</button>
      </header>
    )
  }
}
