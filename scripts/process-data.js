
// reiketu skaidyti i mazesnes dalis sita funkcija, jau pats pasimeciau kai reikejo resolve promise.
function processDataLogic(data){
        // prisiskiriu du atskyrus masyvus, gautus is promise
          const players = data[0]; // player >> [ '2', 'Donatas', 'Drimeikis']
          const points = data[1];  // point >> [ 9, 1 ];
          const finalDataArray = [];

          // pasiruosiu laisvas vietas prie kiekvieno zaidejo,  kad galeciau sumuoti statistika
          for(let i = 0; i < players.length; i++){
            finalDataArray.push(new Array(players[i][0], players[i][1] +" "+ players[i][2], 0, 0, 0, 0, 0, 0))
          }

          // imu kiekvieno zaidejo objekta ir kadangi indexas[0] = zaidejo nr, isrikuoju is eiles.
          finalDataArray.sort((a, b) => {
            return a[0] - b[0];
          }) // player >> [ '2', 'Donatas Drimeikis', 0, 0, 0, 0, 0, 0 ]


          // iteruoju tasku masyva, kiekviena reiksme lyginu su zaidejo nr nestindamas papildoma for, kad gauti zaideju info.
          // kadangi point ir player gaunasi kaip atskiri objektai, toliau viskas per indexus eina.
          points.forEach((point) => {
            for(let player of finalDataArray){
              if(point[0] === player[0]){
                // tikrinu kokia antra reiksme is tasku masyvo ir pagal tai pliusuoju statistika.
                switch(parseInt(point[1])){
                  case 0:
                    player[6] += 1;
                    break;
                  case 1:
                    player[2] += 1; // >> baudu kiekis
                    player[5] += 1; // >> tasku kiekis >> ir t.t.
                    break;
                  case 2:
                    player[3] += 1;
                    player[5] += 2;
                    break;
                  case 3:
                    player[4] += 1;
                    player[5] += 3;
                    break;
                  default:
                    console.log("Wrong value!");
                }
              }
            }

            // dar karta iteruoju masyva, kad apskaiciuoti tiksluma:
            // mesti metimai / bendras skaicius
            finalDataArray.forEach((player => {
              const throws = (player[2] + player[3] + player[4]);
              const missed = player[6];

              if((throws > 0) && (missed > 0)){
                player[7] = Math.round((throws * 100) / (throws + missed));
              }
            }))
        });
        return finalDataArray;
    }


export function getStats(data){

  return new Promise((resolve) => {
    const stats = processDataLogic(data);
      resolve(stats);
  }).catch((error) => {
    console.error(error)
  })
}
