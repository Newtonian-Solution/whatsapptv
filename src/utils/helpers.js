export const limitTextCharacter = (text, limit=13) => {
  const isLess = text.length < limit;
  const limitedText = `${text.slice(0, limit)}${isLess ? "" : "..."}`;
  return limitedText;
};

export function formatDate(value) {
  const days = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const date = new Date(value)
  const formatted = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  return formatted
}
export function allLegit (value) {
  const tv = value.filter(item => item.category === 1 || item.category === 3)
  return tv.length
}
export function allScam (value) {
  const tv = value.filter(item => item.category === 2)
  return tv.length
}
export function calcDayPassed(date1, date2) {
 const dayPassed =  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
 return dayPassed <= 2
}

export const erroMessage = (text) => {
  return  `Message: ${text || "An error occured"}`;
};

export const catchErrMsg = (err) => {
  let message = err?.response?.data?.message;

  if (err.response?.status === 500) message = "Something went wrong (Server)";
  return message;
};
export const shuffleArray  =(array) => {
  return array?.sort(() => Math.random() - 0.5)
}
