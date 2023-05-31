export default function AuthHeader() {
  const user = JSON.stringify(localStorage.getItem("user"));

  console.log(user);

  if (user) {
    return {
      headers: {
        Authorization: "Bearer " + user,
      },
    };
  } else {
    return {};
  }
}
