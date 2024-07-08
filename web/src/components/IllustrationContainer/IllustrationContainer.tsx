import styles from "./IllustrationContainer.module.css";

export default function IllustrationContainer() {
  return (
    <div className={styles.illustrationContainer}>
        <img src="/src/assets/Logo.png" alt="logo" width={49} height={49} className={styles.logo}/>
      <div className={styles.contentContainer}>
        <img src="/src/assets/15.png" width={357} height={357} className={styles.image} />
        <h2 className={styles.title}>Welcome aboard my friend</h2>
        <p className={styles.subtitle}>just a couple of clicks and we start</p>
      </div>
    </div>
  );
}
