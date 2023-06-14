import ViewCounter from './components/page/ViewCounter/ViewCounter';
import styles from './page.module.css';
import Articles from './components/Articles/Articles';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to shaynlink&apos;s technology watching</h1>
        <ViewCounter />
      </section>

      <section className={styles.hero}>
        <h1 className={styles.title}>News technologic</h1>

        <div className={styles.articles_container}>
          <Articles />
        </div>
      </section>
    </main>
  )
}
