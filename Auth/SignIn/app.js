let email = document.getElementById("email");
let password = document.getElementById("password");

async function Login() {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(async (snap) => {
      console.log(snap.user.uid);
      let userId = snap.user.uid;

      await firebase
        .database()
        .ref("users")
        .child(userId)
        .get()
        .then((snapshot) => {
          console.log(snapshot.val());
          if (
            snapshot.val() != undefined &&
            snapshot.val()["userType"] == "user"
          ) {
            console.log("user panel");
            window.location.replace("../../UserPanel/Dashbord/index.html");
          } else if (
            snapshot.val() != undefined &&
            snapshot.val()["userType"] == "admin"
          ) {
            console.log("Admin panel");
            window.location.replace("../../AdminPanel/Dashbaord/index.html");
          }
        });
        alert("Account Login");

      Toastify({
        text: "Account Login",
        duration: 3000,
      }).showToast();
    })

    .catch((e) => {
        alert(e.code);

      Toastify({
        text: e.code,

        duration: 3000,
      }).showToast();
    });
}
