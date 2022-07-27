import type { NextPage } from 'next'
import { Fragment } from 'react'
import styles from '../styles/Home.module.css'
import { Game } from './components/game'
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './components/menu';

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Fragment>
        <div className={styles.containerGame}>
          <Menu />
          <Game />
        </div>
      </Fragment>

      <footer className={styles.footer}>

      </footer>
    </div>

  )
}

export default Home
