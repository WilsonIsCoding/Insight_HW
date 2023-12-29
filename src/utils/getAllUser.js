import axios from "axios";
import formatBirthday from "src/utils/formatBirthday.js";
export async function fetchData() {
  try {
    const response = await axios.get("http://35.194.177.50:7777/members");
    return response.data.members.map((member) => ({
      ...member,
      birthday: formatBirthday(member.birthday),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // 或者你可以選擇拋出異常
  }
}
