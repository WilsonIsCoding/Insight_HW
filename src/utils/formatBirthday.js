export default function formatBirthday(isoDate) {
  let date;
  const adjustDate = new Date(isoDate) == "Invalid Date";
  date = new Date(isoDate.slice(0, adjustDate ? 9 : 10));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}
