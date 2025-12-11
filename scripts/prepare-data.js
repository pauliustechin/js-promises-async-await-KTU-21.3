import * as fs from 'fs';
import { splitData } from "../utils/split-data.js"

"use strict";

function loadData(){
  const loadDataPromises = Promise.all([
    // kad pasimokint, viena promise is kart su fs moduliu pasidariau, o kita susikuriau pats.
    fs.promises.readFile(`../zaidejai.txt`, {encoding: 'utf-8'}),
    
    new Promise((resolve) => {
      const data = fs.readFile(`../taskai.txt`, {encoding: 'utf-8'}, (err, data) => {
        if(err){
          console.error(err);
          return;
        }
        else{
          resolve(data);
        }
      })
        
    })
  ]).catch((error) => {
      console.error("Something went wrong while loading a file.");
      console.error(error);
  });
  return loadDataPromises;
}


export function prepareData(){
  return new Promise((resolve) => {
    loadData()
    .then(([rawPlayerInfo, rawScoreInfo]) => {
    const playerInfo = rawPlayerInfo.split("\r\n");
    const scoreInfo = rawScoreInfo.split("\r\n");
    return [playerInfo, scoreInfo];
    })
    .then(([playerInfo, scoreInfo]) => {
      const player = splitData(playerInfo);
      const score = splitData(scoreInfo);
      // kadangi resolve negali grazinti multiple values, abu array isidedu i viena array
      resolve([player, score]);
    })
    .catch((error) => {
      console.error("Something went wrong while reading a file.");
      console.error(error);
    });
  })
}