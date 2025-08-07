export function getTimeCurrent() {
    const date = new Date();
  
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  
    const day = formatNumber(date.getDate());
    const month = formatNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    const hour = formatNumber(date.getHours());
    const minute = formatNumber(date.getMinutes());
    const second = formatNumber(date.getSeconds());
  
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }
  