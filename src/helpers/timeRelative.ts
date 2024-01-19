const calculateTimeRelative = (oldTimestamp: number) => {
  const date = new Date();
  const timestamp = date.getTime();

  const timeDifference = timestamp - oldTimestamp;

  const seconds = timeDifference / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60) {
    return `Hace ${Math.floor(seconds)} segundos.`;
  } else if (minutes < 60) {
    return `Hace ${Math.floor(minutes)} minutos.`;
  } else if (Math.floor(hours) === 1 ) {
    return `Hace ${Math.floor(hours)} hora.`;
  } else if (hours >= 2 && hours < 24 ) {
    return `Hace ${Math.floor(hours)} horas.`;
  } else {
    return `Hace ${Math.floor(days)} días.`;
  }
  
}

export default calculateTimeRelative;