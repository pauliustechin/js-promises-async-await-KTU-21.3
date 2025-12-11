import * as fs from 'fs';

"use strict";

export function loadData(fileName1, fileName2){
  const loadDataPromises = Promise.all([
    // toks ir buvo tikslas, viena promise is kart su fs moduliu pasidariau, o kita susikuriau pats.
    fs.promises.readFile(`./${fileName1}.txt`, {encoding: 'utf-8'}),

    new Promise((resolve) => {
      const data = fs.readFileSync(`./${fileName2}.txt`, 'utf-8')
        resolve(data);
      })
  ])
  return loadDataPromises;
}
