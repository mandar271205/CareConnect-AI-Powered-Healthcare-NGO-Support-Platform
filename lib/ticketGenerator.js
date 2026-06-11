export function generateTicketId(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const randomDigits = String(Math.floor(1000 + Math.random() * 9000));

  return `CC-${day}${month}-${randomDigits}`;
}
