import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>
          Social Recruitment Web Application
        </h1>

        <p className={styles.description}>
          Click on the icons to interact with the corresponding parts of the API
        </p>

        <div className={styles.grid}>
          <a href="/processes" className={styles.card}>
            <h3>Recruitment Processes &rarr;</h3>
          </a>

          <a href="/organizations" className={styles.card}>
            <h3>Organizations &rarr;</h3>
          </a>

          <a href="/users" className={styles.card}>
            <h3>Users &rarr;</h3>
          </a>

          <a href="/events" className={styles.card}>
            <h3>Events &rarr;</h3>
          </a>

          <a href="/message_chains" className={styles.card}>
            <h3>Message Chains &rarr;</h3>
          </a>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
