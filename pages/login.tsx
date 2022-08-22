import styles from '../styles/Home.module.css'



export default function login() {
  return <>
    <div className={styles.backgroundDark}>
      <section className={styles.signup}>
        <h1>SignIn to Continue</h1>

        <div className={styles.formDiv}>

          <form method="post" action="/api/auth/signin/email">
            <div>
              <label>Username:</label>
              <input type="text" id="username" name="username" />
            </div>

            <div>
              <label>Password (8 characters minimum):</label>
              <input type="password" id="pass" name="password" required />
            </div>

            <p></p>
            <button className={styles.btn} type="submit">Sign in</button>
          </form>

        </div>
      </section>
    </div> </>
}
