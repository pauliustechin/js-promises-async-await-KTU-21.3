import * as fs from 'fs';

export async function writeDataFile(data){
  
  let content = (
    "*********************************************************************************\n" +
    "|Nr| Vardas Pavardė      | Baudos | Dvit. | Trit. | Taškai | Nepat. | Tikslumas|\n" +
    "*********************************************************************************\n"
  );
  let maxPoints = 0;
  let maxThreePoints = 0;
  let bestAccuracy = 0;
  let maxPointsContent;
  let maxThreePointsContent;
  let bestAccuracyContent;

  try{
    await fs.appendFileSync("../boxscore.txt", content);
    // nesugalvojau kaip graziai lygiavima padaryti.
    await data.forEach((player) => {
      content = (
        `|${player[0]}| ${player[1]}      | ${player[2]} | ${player[3]} | ${player[4]} | ${player[5]} | ${player[6]} | ${player[7]}|\n`
      );
      fs.appendFileSync("../boxscore.txt", content);

      if(player[5] > maxPoints){
        maxPoints = player[5];
        maxPointsContent = `Nr. ${player[0]}  ${player[1]}     ${player[5]} Pts.`
      }
      if(player[4] > maxThreePoints){
        maxThreePoints = player[4];
        maxThreePointsContent = `Nr. ${player[0]}  ${player[1]}     ${player[4]} 3Pts`
      }
      if(player[7] > bestAccuracy){
        bestAccuracy = player[5];
        bestAccuracyContent = `Nr. ${player[0]}  ${player[1]}     ${player[7]} %`
      }
    })
    content = (
      "*********************************************************************************\n" +
      "                                                                                 \n" +
      `                 Most points: ${maxPointsContent}\n`+
      `      Most three points made: ${maxThreePointsContent}\n`+
      `The best shooting percentage: ${bestAccuracyContent}\n`
      );
    await fs.appendFileSync("../boxscore.txt", content);
  }
  catch(error){
    console.error("Something went wrong while writing a file");
    console.error(error);
  }

}