class Player {
  constructor(id, diceCount) {
    this.id = id;
    this.dice = new Array(diceCount).fill(0).map(() => this.rollDice());
    this.points = 0;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  playTurn() {
    return this.dice.map(() => this.rollDice());
  }

  evaluateDice(diceRolled, nextPlayer) {
    this.dice = []; // Reset dice pada round selanjutnya

    diceRolled.forEach((die) => {
      if (die === 6) {
        this.points++;
      } else if (die === 1) {
        nextPlayer.dice.push(1);
      } else {
        this.dice.push(die);
      }
    });
  }

  isPlaying() {
    return this.dice.length > 0;
  }
}

function playGame(numPlayers, numDice) {
  const players = new Array(numPlayers)
    .fill(0)
    .map((_, i) => new Player(i + 1, numDice));

  let turn = 1;
  let activePlayers = numPlayers;

  while (activePlayers > 1) {
    console.log(`==================`);
    console.log(`Giliran ${turn} lempar dadu:`);

    const diceRolledByPlayers = players.map((player) =>
      player.isPlaying() ? player.playTurn() : []
    );

    players.forEach((player, i) => {
      if (player.isPlaying()) {
        console.log(
          `Pemain #${player.id} (${player.points}): ${diceRolledByPlayers[
            i
          ].join(",")}`
        );
      } else {
        console.log(`Pemain #${player.id} (${player.points}): _`);
      }
    });

    const diceToGive = new Array(numPlayers).fill(null).map(() => []);
    players.forEach((player, i) => {
      if (player.isPlaying()) {
        const nextPlayerIndex = (i + 1) % numPlayers;
        player.evaluateDice(diceRolledByPlayers[i], {
          dice: diceToGive[nextPlayerIndex],
        });
      }
    });

    players.forEach((player, i) => {
      if (player.isPlaying()) {
        player.dice = player.dice.concat(diceToGive[i]);
      }
    });

    console.log(`Setelah evaluasi:`);
    activePlayers = 0;
    players.forEach((player) => {
      if (player.isPlaying()) {
        console.log(
          `Pemain #${player.id} (${player.points}): ${player.dice.join(",")}`
        );
        activePlayers++;
      } else {
        console.log(`Pemain #${player.id} (${player.points}): _`);
      }
    });

    turn++;
  }

  console.log(`==================`);
  console.log(`Game berakhir karena hanya satu pemain yang memiliki dadu.`);

  let winner = players[0];
  for (let player of players) {
    if (player.points > winner.points) {
      winner = player;
    }
  }

  console.log(
    `Game dimenangkan oleh pemain #${winner.id} dengan ${winner.points} poin.`
  );
}

// Contoh penggunaan
playGame(3, 4);
