// REGISTER  LOGIC
export const handleEmailRegister = (userEmail, userPass) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        resolve(user.uid);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        reject(errorMessage);
        // ..
      });
  });
};
