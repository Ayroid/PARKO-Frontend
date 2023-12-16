while (true) {
  let time = Date.now();
  let timeISO = new Date(time).toISOString();
  let remainingTime = 5000 - (time % 5000);
  if (time % 5000 == 0) console.log(timeISO);
  console.log(`Remaining time: ${remainingTime/1000}s`);
}
