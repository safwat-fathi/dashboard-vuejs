export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accesToken) {
    return { Authorization: "Bearer " + user.accessToken };
  }

  return {};
}
