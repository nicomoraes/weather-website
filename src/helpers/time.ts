export function getHours(milliseconds: number) {
const data = new Date(milliseconds);
const horas = data.getHours().toString().padStart(2, '0');
const minutos = data.getMinutes().toString().padStart(2, '0');
const segundos = data.getSeconds().toString().padStart(2, '0');

return`${horas}:${minutos}:${segundos}`;
}