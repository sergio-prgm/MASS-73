import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Header () {
  const { setTheme, theme } = useTheme()

  return (
    <header className='flex flex-row justify-between items-center'>
      <Link href='/dashboard' >
        <a>Dashboard</a>
      </Link>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <div>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className='px-6 my-6 py-2 rounded font-bold bg-slate-900 dark:bg-slate-50 text-slate-100 dark:text-slate-800 uppercase'
        >
          Toggle {theme === 'light' ? 'dark' : 'light'}
        </button>
      </div>
    </header>
  )
}
