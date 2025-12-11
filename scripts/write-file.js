import * as fs from 'fs';


function tableHeader(){
  const content = (
    "*********************************************************************************\n" +
    "|Nr| Vardas Pavardė      | Baudos | Dvit. | Trit. | Taškai | Nepat. | Tikslumas|\n" +
    "*********************************************************************************\n"
  );
  return content;
}

function tableBody(data){

  let content ="";

  data.forEach((player) => {
    content += `|${player[0]}| ${player[1]}      | ${player[2]} | ${player[3]} | ${player[4]} | ${player[5]} | ${player[6]} | ${player[7]}|\n`
    });  

    return content;
  }

  function tableFooter(data){

    let maxPoints = 0;
    let maxThreePoints = 0;
    let bestAccuracy = 0;
    let maxPointsContent = "";
    let maxThreePointsContent = "";
    let bestAccuracyContent = "";

    data.forEach((player) => {
      if(player[5] > maxPoints){
        maxPoints = player[5];
        maxPointsContent = `Nr. ${player[0]}  ${player[1]}     ${player[5]} Pts.`
      }
      if(player[4] > maxThreePoints){
        maxThreePoints = player[4];
        maxThreePointsContent = `Nr. ${player[0]}  ${player[1]}     ${player[4]} 3Pts`
      }
      if(player[7] > bestAccuracy){
        bestAccuracy = player[7];
        bestAccuracyContent = `Nr. ${player[0]}  ${player[1]}     ${player[7]} %`
      }
    })

    let content = (
      "*********************************************************************************\n" +
      "                                                                                 \n" +
      `                 Most points: ${maxPointsContent}\n`+
      `      Most three points made: ${maxThreePointsContent}\n`+
      `The best shooting percentage: ${bestAccuracyContent}\n`
      );

    return content;
  }

export async function writeDataFile(data){
  try{
    await fs.appendFile("../boxscore.txt", tableHeader(), err => {
      if(err){
        console.error("Something went wrong while writing header of a file.")
      }
    })

    await fs.appendFile("../boxscore.txt", tableBody(data), err => {
      if(err){
        console.error("Something went wrong while writing body of a file.")
      }
    })

    await fs.appendFile("../boxscore.txt", tableFooter(data), err => {
      if(err){
        console.error("Something went wrong while writing footer of a file.")
      }
    })
  }
  
  catch(error){
    console.error("Something went wrong while writing a file");
    console.error(error);
  }
}