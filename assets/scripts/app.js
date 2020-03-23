const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;


adjustHealthBars(chosenMaxLife);

function attackHandler() {
   const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
   currentMonsterHealth -= monsterDamage;
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
   currentPlayerHealth -= playerDamage;

   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert(' Mob downed!');
   }
   else if (currentPlayerHealth <=0 && currentMonsterHealth > 0){
      alert('Wiped')
   }
   else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0) {
      alert('What was it good for ? Both wiped')
   }

} 

function strongAttackHandler() {
   const monsterDamage = dealMonsterDamage(STRONG_ATTACK_VALUE);
   currentMonsterHealth -= monsterDamage;
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
   currentPlayerHealth -= playerDamage;

   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert(' Mob downed!');
   }
   else if (currentPlayerHealth <=0 && currentMonsterHealth > 0){
      alert('Wiped')
   }
   else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0) {
      alert('What was it good for ? Both wiped')
   }
}



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);