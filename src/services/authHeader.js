export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.acces_token) {
    return { Authorization: "Bearer " + user.acces_token };
  }

  return {};
}
