module.exports = (subsLength) => {
  const dt = new Date();
  switch(subsLength){
    case 1:
      if(dt.getMonth() > 10){
        dt.setFullYear((dt.getFullYear() + 1), 0);
      }
      else {
        dt.setMonth(dt.getMonth() + 1);
      }
      break;
    case 2:
      if(dt.getMonth() > 5){
        dt.setFullYear((dt.getFullYear() + 1),((dt.getMonth() + 6) % 12));
      }
      else {
        dt.setMonth(dt.getMonth() + 6);
      }
      break;
    case 3:
      dt.setFullYear(dt.getFullYear() + 1);
      break;
  }
  return dt;
}