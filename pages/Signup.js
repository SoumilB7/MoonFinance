import React, { useEffect } from "react";
import "../app/globals.css";
import { useState } from "react";
import { apple } from "@/public/apple.svg";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { app } from "../firebase/firebase-config";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";

const userToken = getCookie("userToken");
const userUid = getCookie("userUid");
const isAuth = getCookie("auth");
const Signup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  // UPDATE COOKIES
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        user.getIdToken().then((token) => {
          setCookie("userToken", token);
          setCookie("userUid", uid);
          setCookie("auth", "true");
        });
      } else {
        setCookie("userToken", "");
        setCookie("userUid", "");
        setCookie("auth", "false");

        // ...
      }
    });
  }, []);
  // --- HANDLE NEW USER ---
  const handleNewUser = async (
    userName,
    userEmail,
    userPassword,
    userUid,
    authType = ""
  ) => {
    try {
      const response = await fetch("/api/routes/user/authActions/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
          mobileNumber: -1,
          userUid: userUid,
          authType: authType,
        }),
      });
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  //--HANDLE OLD USER--
  const handleOldUser = async () => {
    router.push("/");
  };
  // --- GOOGLE LOGIN ---
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("triggerd");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const tokens = credential.accessToken;

        const user = result.user;

        const additionalInfo = getAdditionalUserInfo(result);
        console.log("additional info");
        console.log(additionalInfo);
        console.log("user");
        console.log(user);
        console.log("credential");
        console.log(credential);
        console.log("tokens");
        console.log(tokens);
        if (additionalInfo.isNewUser) {
          handleNewUser(
            additionalInfo.profile.name,
            additionalInfo.profile.email,
            null,
            user.uid,
            "google"
          );
        } else {
          console.log("welcome back " + additionalInfo.profile.name);
          handleOldUser();
        }
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  // REGISTER  LOGIC
  const handleEmailRegister = (userEmail, userPass) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userUid = await handleEmailRegister(
        formState.email,
        formState.password
      );
      console.log(userUid);
      // If login is successful, you can redirect the user to another page
      // For example, redirect to dashboard
      const response = await fetch("/api/routes/user/authActions/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.username,
          email: formState.email,
          password: formState.password,
          mobileNumber: formState.phone,
          userUid: userUid,
        }),
      });
      router.push("/");
      console.log("user created ");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again."); // Display generic error message
    }
  };

  return (
    <div className="flex">
      <div className="min-h-screen w-0 bg-blue-500 md:w-1/2">
        <div className="flex justify-center mt-16">
          <svg
            width="245"
            height="245"
            viewBox="0 0 245 245"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M163.47 47.3831L173.509 69.4838L119.881 93.5966L126.588 109.292L180.594 84.2649L190.188 105.874L206.064 61.9018L163.47 47.3831Z"
              fill="white"
            />
            <path
              d="M125.465 152.691V131.89L176.135 108.777V128.423L125.465 152.691Z"
              fill="white"
            />
            <path
              d="M68.7393 64.894L130.688 102.55"
              stroke="white"
              stroke-width="15.8065"
            />
            <path
              d="M125.811 190.846V172.206L147 160.576V178.738L125.811 190.846Z"
              fill="white"
            />
            <path
              d="M104.39 190.008C90.3278 187.174 74.8831 180.368 64.6666 170.298C54.4502 160.228 47.3917 147.397 44.3554 133.377C41.3192 119.357 42.4369 104.756 47.5717 91.361C52.7065 77.9663 61.1471 66.6853 72.7773 58.2875L83.7783 72.5205C74.9795 78.8739 68.2242 87.655 64.3394 97.7888C60.4547 107.923 59.6091 118.969 61.9062 129.576C64.2033 140.183 69.5434 149.89 77.2726 157.509C85.0019 165.127 93.7513 170.741 104.39 172.884L104.39 190.008Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="text-center text-2xl font-sans font-semibold mt-16">
          <label>MOON FINANCE</label>
        </div>
        <div className="text-center text-2xl font-sans font-light mt-4">
          <label>AI investment advisory for GenZ</label>
        </div>
      </div>
      <div className="flex flex-col  items-center min-h-screen w-full md:w-1/2 bg-black">
        <div className="text-6xl font-sans font-bold text-center mt-16 pt-4">
          <label>Sign up</label>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex justify-center">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="bg-black text-white block w-7/8 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Username"
                value={formState.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="bg-black text-white block w-7/8 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Phone number"
                value={formState.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-black text-white block w-7/8 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Email address"
                value={formState.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-black text-white block w-7/8 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Password"
                value={formState.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex justify-center py-2 px-12 mt-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            CREATE ACCOUNT
          </button>
        </div>
        <div className="flex border-b-2 border-gray-400 mt-12 w-4/6 mx-[17%]"></div>
        <div className="flex column flex-start mb-12">
          <div className=" mt-4 flex column  mr-4">
            <div
              className="cursor-pointer flex space-x-2  text-center  "
              onClick={loginWithGoogle}
            >
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1020_16)">
                    <path
                      d="M13.586 1.28274C9.68926 2.63454 6.32874 5.20031 3.99803 8.60316C1.66731 12.006 0.489247 16.0666 0.636871 20.1885C0.784495 24.3104 2.25003 28.2763 4.8182 31.5037C7.38638 34.7311 10.9218 37.0499 14.9053 38.1195C18.1347 38.9528 21.5182 38.9894 24.7649 38.2261C27.7062 37.5654 30.4254 36.1523 32.6564 34.125C34.9783 31.9506 36.6637 29.1844 37.5314 26.1239C38.4741 22.7957 38.6419 19.2957 38.0219 15.8925H19.8869V23.4152H30.3895C30.1796 24.6151 29.7298 25.7602 29.067 26.7821C28.4042 27.8041 27.542 28.6818 26.5321 29.3627C25.2498 30.2114 23.804 30.7822 22.2878 31.0385C20.7673 31.3213 19.2076 31.3213 17.6871 31.0385C16.1458 30.7202 14.6878 30.0841 13.4062 29.1708C11.347 27.7131 9.80076 25.6423 8.98823 23.2538C8.16219 20.8205 8.16219 18.1826 8.98823 15.7493C9.5666 14.0437 10.5227 12.4908 11.7853 11.2064C13.2301 9.70962 15.0592 8.63971 17.0721 8.11406C19.0849 7.58841 21.2036 7.62734 23.1958 8.22656C24.7521 8.70408 26.1753 9.53879 27.3517 10.6641C28.536 9.48594 29.7181 8.30477 30.8983 7.12055C31.5077 6.48375 32.1719 5.87742 32.7721 5.22539C30.9761 3.55424 28.868 2.25379 26.5687 1.39852C22.3814 -0.121904 17.7997 -0.162764 13.586 1.28274Z"
                      fill="white"
                    />
                    <path
                      d="M13.5859 1.28272C17.7993 -0.163761 22.381 -0.123977 26.5686 1.39546C28.8684 2.25654 30.9755 3.56325 32.769 5.24061C32.1596 5.89264 31.5168 6.50202 30.8952 7.13577C29.713 8.31592 28.5318 9.49202 27.3517 10.6641C26.1753 9.53877 24.7521 8.70407 23.1957 8.22655C21.2042 7.62522 19.0856 7.58405 17.0722 8.10755C15.0588 8.63104 13.2285 9.69899 11.7821 11.1942C10.5196 12.4786 9.56349 14.0315 8.98512 15.7371L2.66895 10.8469C4.92975 6.36357 8.8442 2.9342 13.5859 1.28272Z"
                      fill="#E33629"
                    />
                    <path
                      d="M0.993038 15.6914C1.33228 14.0088 1.89591 12.3794 2.66882 10.8469L8.98499 15.7493C8.15895 18.1826 8.15895 20.8204 8.98499 23.2537C6.88062 24.8787 4.77523 26.5119 2.66882 28.1531C0.734513 24.3028 0.144583 19.9159 0.993038 15.6914Z"
                      fill="#F8BD00"
                    />
                    <path
                      d="M19.8871 15.8895H38.0221C38.6421 19.2926 38.4743 22.7926 37.5316 26.1209C36.6639 29.1814 34.9785 31.9476 32.6566 34.122C30.6182 32.5315 28.5707 30.9532 26.5323 29.3627C27.5429 28.6811 28.4055 27.8024 29.0683 26.7794C29.7311 25.7564 30.1805 24.6101 30.3897 23.4092H19.8871C19.884 20.9046 19.8871 18.397 19.8871 15.8895Z"
                      fill="#587DBD"
                    />
                    <path
                      d="M2.66602 28.1531C4.77242 26.5281 6.87781 24.895 8.98219 23.2538C9.79634 25.6431 11.3447 27.7141 13.4062 29.1708C14.6919 30.0799 16.153 30.7108 17.6963 31.0233C19.2168 31.3061 20.7765 31.3061 22.297 31.0233C23.8132 30.767 25.259 30.1962 26.5413 29.3475C28.5797 30.938 30.6272 32.5163 32.6655 34.1067C30.4349 36.1351 27.7157 37.5493 24.7741 38.2109C21.5274 38.9741 18.1439 38.9375 14.9145 38.1042C12.3603 37.4222 9.97448 36.22 7.90664 34.5729C5.71816 32.835 3.93057 30.6452 2.66602 28.1531Z"
                      fill="#319F43"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1020_16">
                      <rect width="39" height="39" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <p className="text-sm">Sign up with Google</p>
            </div>
          </div>
          <button onClick={loginWithGoogle} className="ml-12 mt-4">
            <svg
              width="80"
              height="30"
              viewBox="0 0 122 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2353 11.8235V7.41176C16.2353 6.24169 16.7001 5.11954 17.5275 4.29218C18.3548 3.46481 19.477 3 20.6471 3H36.0882C37.2583 3 38.3805 3.46481 39.2078 4.29218C40.0352 5.11954 40.5 6.24169 40.5 7.41176V33.8824C40.5 35.0524 40.0352 36.1746 39.2078 37.0019C38.3805 37.8293 37.2583 38.2941 36.0882 38.2941H20.6471C19.477 38.2941 18.3548 37.8293 17.5275 37.0019C16.7001 36.1746 16.2353 35.0524 16.2353 33.8824V29.4706"
                stroke="white"
                stroke-width="4.41177"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.9998 20.6471H31.6763M31.6763 20.6471L25.0586 14.0294M31.6763 20.6471L25.0586 27.2647"
                stroke="white"
                stroke-width="4.41177"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M55.9151 29.147V12.8652H59.3575V26.3088H66.3377V29.147H55.9151ZM74.0712 29.3855C72.8363 29.3855 71.7683 29.1232 70.8673 28.5985C69.9716 28.0685 69.2799 27.3318 68.7923 26.3883C68.3047 25.4396 68.0609 24.3399 68.0609 23.089C68.0609 21.8276 68.3047 20.7252 68.7923 19.7818C69.2799 18.8331 69.9716 18.0964 70.8673 17.5717C71.7683 17.0417 72.8363 16.7767 74.0712 16.7767C75.3061 16.7767 76.3714 17.0417 77.2671 17.5717C78.1682 18.0964 78.8625 18.8331 79.3501 19.7818C79.8377 20.7252 80.0815 21.8276 80.0815 23.089C80.0815 24.3399 79.8377 25.4396 79.3501 26.3883C78.8625 27.3318 78.1682 28.0685 77.2671 28.5985C76.3714 29.1232 75.3061 29.3855 74.0712 29.3855ZM74.0871 26.762C74.6489 26.762 75.118 26.603 75.4943 26.285C75.8706 25.9617 76.1541 25.5218 76.3449 24.9653C76.541 24.4088 76.6391 23.7754 76.6391 23.0652C76.6391 22.355 76.541 21.7216 76.3449 21.1651C76.1541 20.6086 75.8706 20.1687 75.4943 19.8454C75.118 19.5221 74.6489 19.3604 74.0871 19.3604C73.52 19.3604 73.043 19.5221 72.6561 19.8454C72.2745 20.1687 71.9856 20.6086 71.7895 21.1651C71.5987 21.7216 71.5033 22.355 71.5033 23.0652C71.5033 23.7754 71.5987 24.4088 71.7895 24.9653C71.9856 25.5218 72.2745 25.9617 72.6561 26.285C73.043 26.603 73.52 26.762 74.0871 26.762ZM87.7851 33.9807C86.688 33.9807 85.7473 33.8297 84.9628 33.5275C84.1837 33.2307 83.5636 32.8253 83.1025 32.3112C82.6414 31.7971 82.342 31.2194 82.2042 30.5781L85.3365 30.1567C85.4319 30.4005 85.583 30.6284 85.7897 30.8404C85.9964 31.0524 86.2693 31.222 86.6085 31.3492C86.953 31.4817 87.3717 31.548 87.8646 31.548C88.6014 31.548 89.2082 31.3678 89.6852 31.0074C90.1675 30.6523 90.4087 30.056 90.4087 29.2186V26.9846H90.2656C90.1172 27.3238 89.8946 27.6445 89.5978 27.9466C89.301 28.2487 88.9194 28.4951 88.4529 28.6859C87.9865 28.8767 87.43 28.9721 86.7834 28.9721C85.8665 28.9721 85.0317 28.7601 84.2791 28.3361C83.5318 27.9068 82.9356 27.2523 82.4904 26.3724C82.0505 25.4873 81.8305 24.369 81.8305 23.0175C81.8305 21.6342 82.0558 20.4788 82.5063 19.5512C82.9568 18.6237 83.5557 17.9294 84.303 17.4683C85.0556 17.0072 85.8798 16.7767 86.7755 16.7767C87.4592 16.7767 88.0316 16.8933 88.4927 17.1265C88.9538 17.3544 89.3248 17.6406 89.6057 17.9851C89.8919 18.3243 90.1119 18.6582 90.2656 18.9868H90.3928V16.9357H93.7557V29.2663C93.7557 30.3051 93.5013 31.1743 92.9925 31.8739C92.4837 32.5735 91.7787 33.0982 90.8777 33.448C89.982 33.8032 88.9512 33.9807 87.7851 33.9807ZM87.8567 26.4281C88.4026 26.4281 88.8637 26.2929 89.24 26.0226C89.6216 25.747 89.9131 25.3548 90.1145 24.846C90.3212 24.3319 90.4246 23.7171 90.4246 23.0016C90.4246 22.2861 90.3239 21.666 90.1225 21.1413C89.9211 20.6113 89.6296 20.2005 89.248 19.909C88.8664 19.6175 88.4026 19.4717 87.8567 19.4717C87.3002 19.4717 86.8311 19.6228 86.4495 19.9249C86.0679 20.2217 85.7791 20.6351 85.583 21.1651C85.3869 21.6951 85.2888 22.3073 85.2888 23.0016C85.2888 23.7065 85.3869 24.316 85.583 24.8301C85.7844 25.3389 86.0732 25.7338 86.4495 26.0147C86.8311 26.2903 87.3002 26.4281 87.8567 26.4281ZM101.632 29.147V16.9357H105.019V29.147H101.632ZM103.334 15.3615C102.83 15.3615 102.398 15.1946 102.038 14.8607C101.683 14.5215 101.505 14.116 101.505 13.6443C101.505 13.1779 101.683 12.7777 102.038 12.4438C102.398 12.1046 102.83 11.935 103.334 11.935C103.837 11.935 104.266 12.1046 104.621 12.4438C104.982 12.7777 105.162 13.1779 105.162 13.6443C105.162 14.116 104.982 14.5215 104.621 14.8607C104.266 15.1946 103.837 15.3615 103.334 15.3615ZM111.119 22.0873V29.147H107.732V16.9357H110.96V19.0901H111.103C111.373 18.3799 111.826 17.8181 112.462 17.4047C113.098 16.986 113.869 16.7767 114.776 16.7767C115.624 16.7767 116.363 16.9622 116.994 17.3332C117.625 17.7042 118.115 18.2342 118.465 18.9232C118.814 19.6069 118.989 20.4231 118.989 21.3718V29.147H115.603V21.976C115.608 21.2287 115.417 20.6457 115.03 20.227C114.643 19.803 114.111 19.591 113.432 19.591C112.976 19.591 112.574 19.689 112.224 19.8852C111.879 20.0813 111.609 20.3675 111.413 20.7438C111.222 21.1148 111.124 21.5626 111.119 22.0873Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
