import LiveSearch from './components/LiveSearch'
import AppHeader from './components/AppHeader'
import './assets/styles/styles.scss'

export default function Home() {
  return (
    <section className='main-page-container flex column'>
      <AppHeader />
      <LiveSearch />
    </section>
  )
}
