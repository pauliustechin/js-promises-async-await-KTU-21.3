
function setDataArrays(data){
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
  return [finalDataArray, points];
}

function setData(finalDataArray, pointsArray){

          pointsArray.forEach((point) => {
            for(let player of finalDataArray){
              if(point[0] === player[0]){
                // tikrinu kokia antra reiksme is tasku masyvo ir pagal tai pliusuoju statistika.
                switch(parseInt(point[1])){
                  case 0:
                    player[6] += 1;
                    break;
                  case 1:
                    player[2] += 1; // >> baudu count
                    player[5] += 1; // >> sum total points
                    break;
                  case 2:
                    player[3] += 1;
                    player[5] += 2; // >> sum total points
                    break;
                  case 3:
                    player[4] += 1;
                    player[5] += 3; // >> sum total points
                    break;
                  default:
                    console.log("Wrong value!");
                }
              }
            }

            // dar karta iteruoju masyva, kad apskaiciuoti tiksluma:
            // imesti metimai / bendras skaicius
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

  const [playerDataArray, pointsArray] = setDataArrays(data);
  const finalDataArray = setData(playerDataArray, pointsArray);

  return finalDataArray;

}