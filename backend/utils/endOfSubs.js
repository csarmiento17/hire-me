module.exports = (subsLength) => {
  const dt = new Date();
  switch(subsLength){
    case 0:
      if(dt.getMonth() > 10){
        dt.setFullYear((dt.getFullYear() + 1), 0);
      }
      else {
        dt.setMonth(dt.getMonth() + 1);
      }
      break;
    case 1:
      if(dt.getMonth() > 5){
        dt.setFullYear((dt.getFullYear() + 1),((dt.getMonth() + 6) % 12));
      }
      else {
        dt.setMonth(dt.getMonth() + 6);
      }
      break;
    case 2:
      dt.setFullYear(dt.getFullYear() + 1);
      break;
  }
  return dt;
}