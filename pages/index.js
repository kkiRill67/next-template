import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Документация</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Добро пожаловать в <img src="/next.png" className={styles.logo} />

        </h1>

        <div className={styles.grid}>
          <Link href="docs">
            <a className={styles.card}>
              <h3>Документация &rarr;</h3>
              <p>Найдите подробную информацию о функциях Next.js и API.</p>
            </a>
          </Link>

          <a href="https://nextjs.org/" target="_blank" className={styles.card}>
            <h3>Официальный сайт Next.js &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Примеры &rarr;</h3>
            <p>Примеры сайтов который разработаны с помощью Next.js.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Разное &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://jscripts.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          Переведено сайтом JScripts.ru
        </a>
      </footer>
    </div>
  )
}
