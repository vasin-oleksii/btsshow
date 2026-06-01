import styles from './styles.module.css';

export const StartMenu = ({ onStartClick }) => {
  return (
    <div className={styles.main}>
      <button className={styles.startButton} onClick={onStartClick}>
        <div>
          <h1>CyberMon</h1>
          <p>
            Dans ce jeu, vous incarnez un Pokémon et répondez à des
            questions sur la cybersécurité. Une réponse correcte vous
            permet d’attaquer puissamment l’ennemi ou de restaurer votre
            santé. Mais attention, une mauvaise réponse affaiblit votre
            attaque, et votre adversaire n’a aucun scrupule à vous
            vaincre ! Les questions sont générées aléatoirement, alors
            soyez prêts et répondez avec précision !
            <br />
            <br />
            Cliquez sur Pikachu pour commencer🥰
          </p>
        </div>
        <img src="https://img.pokemondb.net/sprites/sun-moon/normal/pikachu-f.png"></img>
      </button>
    </div>
  );
};
