import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useAIOpponent, useBattleSequence } from 'hooks';
import { opponentStats, playerStats, wait } from 'shared';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';

import { questions } from 'data';

export const Battle = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState({});
  const [asks, setAsks] = useState(questions[0]);

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  useEffect(() => {
    function getRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setAsks(questions[randomIndex]);
    }

    getRandomQuestion();
  }, [opponentHealth]);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (playerHealth === 0 || opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  return (
    <div
      style={{
        transform: 'scale(0.75)',
        width: '100vw',
        marginTop: '-100px',
      }}
    >
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            main={false}
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={playerStats.name}
              src={playerStats.img}
              className={styles[playerAnimation]}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              alt={opponentStats.name}
              src={opponentStats.img}
              className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer message={`${asks?.question}`} />
          </div>
          {!inSequence && turn === 0 && (
            <div className={styles.hudChild}>
              <BattleMenu
                asks={asks}
                onHeal={() => setSequence({ mode: 'heal', turn })}
                onMagic={() => setSequence({ mode: 'magic', turn })}
                onAttack={() => setSequence({ mode: 'attack', turn })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
