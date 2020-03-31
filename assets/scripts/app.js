const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEALTH_BOOST = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('How old is Johann in weeks ?', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
   chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];


adjustHealthBars(chosenMaxLife);

function reset() {
   currentMonsterHealth = chosenMaxLife;
   currentPlayerHealth = chosenMaxLife;
   resetGame(chosenMaxLife);
}

function endRound () {
   const initiPlayerHealth = currentPlayerHealth;
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
   currentPlayerHealth -= playerDamage;
   writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

   if (currentPlayerHealth <= 0 && hasBonusLife) {
      hasBonusLife = false;
      removeBonusLife();
      currentPlayerHealth = initiPlayerHealth;
      setPlayerHealth(initiPlayerHealth);
      alert('Lucky boy, you got a few more minutes');
   }

   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert('Johann can stay up');
      writeToLog(LOG_EVENT_MONSTER_ATTACK, 'Bedtime postponed', playerDamage, currentMonsterHealth, currentPlayerHealth);
      reset();
   }
   else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert('Johann has to go sleepy time');
      writeToLog(LOG_EVENT_MONSTER_ATTACK, 'Bedtime now', playerDamage, currentMonsterHealth, currentPlayerHealth);
      reset();
   }
   else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert('Uh oh, guess you can stay awake in bed');
      writeToLog(LOG_EVENT_MONSTER_ATTACK, 'A draw', playerDamage, currentMonsterHealth, currentPlayerHealth);
      reset();
   }
}

function attackMonster(mode) {
   const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
   const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
   
   /*if (mode === MODE_ATTACK) {
      maxDamage = ATTACK_VALUE;
      logEvent = LOG_EVENT_PLAYER_ATTACK;
   }
   else if (mode === MODE_STRONG_ATTACK) {
      maxDamage = STRONG_ATTACK_VALUE;
      logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
   }
   */
   const monsterDamage = dealMonsterDamage(maxDamage);
   currentMonsterHealth -= monsterDamage;
   writeToLog(logEvent, maxDamage, currentMonsterHealth, currentPlayerHealth);
   endRound();

}

function attackHandler() {
   attackMonster(MODE_ATTACK);
} 

function strongAttackHandler() {
   attackMonster(MODE_STRONG_ATTACK);

}

function healPlayerHandler() {
   let healValue;
   if ( currentPlayerHealth >= chosenMaxLife - HEALTH_BOOST) {
      alert('Cant have toomuch milk!');
      healValue = chosenMaxLife - currentPlayerHealth;
   } else {
      healValue = HEALTH_BOOST;
   }
   const playerHealthBoost = increasePlayerHealth(healValue);
   currentPlayerHealth += playerHealthBoost;
   writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
   endRound();
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
   let logEntry = {};
   if (event === LOG_EVENT_PLAYER_ATTACK) {
      logEntry = {
         event: ev,
         value: val,
         target: 'Monster',
         finalMonsterHealth: monsterHealth,
         finalPlayerHealth: playerHealth,
      };
      
   } else if ( ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
      logEntry = {
         event: ev,
         value: val,
         target: 'Monster',
         finalMonsterHealth: monsterHealth,
         finalPlayerHealth: playerHealth,
      };
      
   } else if ( ev === LOG_EVENT_MONSTER_ATTACK) {
      logEntry = {
         event: ev,
         value: val,
         target: 'Player',
         finalMonsterHealth: monsterHealth,
         finalPlayerHealth: playerHealth,
      };
      
   } else if (ev === LOG_EVENT_PLAYER_HEAL) {
      logEntry = {
         event: ev,
         value: val,
         target: 'Player',
         finalMonsterHealth: monsterHealth,
         finalPlayerHealth: playerHealth,
      };
     
   } else if ( ev === LOG_EVENT_GAME_OVER) {
      logEntry = {
         event: ev,
         value: val,
         finalMonsterHealth: monsterHealth,
         finalPlayerHealth: playerHealth,
      };
      
   }
   battleLog.push(logEntry);
}

function printLogHandler (){
   for (let i = 0; i < 3; i++) {
      console.log('---------------');
      }  

   let i = 0;
   for (const logEntry of battleLog) {
      console.log(`#${i}`);
      for (const key in logEntry) {
         console.log(key);
         console.log(logEntry[key]);
      }
   }   
   }
    


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);