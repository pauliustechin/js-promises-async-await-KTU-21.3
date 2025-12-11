import { prepareData } from "./prepare-data.js";

let tempData = [[
    [ '12', 'Aldevinas', 'Siriūnaitis' ],
    [ '13', 'Darius', 'Gricius' ],
    [ '2', 'Donatas', 'Drimeikis' ],
    [ '4', 'Giedrius', 'Purauskas' ],
    [ '10', 'Henrikas', 'Paulauskas' ],
    [ '11', 'Justas', 'Ališauskas' ],
    [ '9', 'Justinas', 'Vitkus' ],
    [ '23', 'Mindaugas', 'Lukonaitis' ],
    [ '3', 'Robertinas', 'Vilimas' ],
    [ '26', 'Tomas', 'Lukonaitis' ],
    [ '88', 'Tomas', 'Samalionis' ],
    [ '33', 'Valdas', 'Dobilas' ]
  ],
  [
  [ '12', '0' ], [ '12', '1' ],
  [ '12', '1' ], [ '11', '3' ],
  [ '9', '2' ],  [ '16', '2' ],
  [ '33', '2' ], [ '9', '0' ],
  [ '4', '0' ],  [ '4', '1' ],
  [ '11', '2' ], [ '16', '3' ],
  [ '10', '2' ], [ '9', '0' ],
  [ '11', '3' ], [ '9', '2' ],
  [ '23', '3' ], [ '33', '3' ],
  [ '10', '1' ], [ '11', '0' ],
  [ '9', '3' ],  [ '33', '0' ],
  [ '23', '2' ], [ '23', '0' ],
  [ '9', '2' ],  [ '9', '1' ],
  [ '9', '1' ]
]]


// reiketu skaidyti i mazesnes dalis sita funkcija:
function getStats(data){
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

console.log(getStats(tempData))