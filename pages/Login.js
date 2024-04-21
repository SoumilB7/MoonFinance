import React from "react";
import "../app/globals.css";
import { useState } from "react";
import { apple } from "@/public/apple.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-row">
      <div className="min-h-screen w-1/2 bg-blue-500">
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
      <div className="min-h-screen w-1/2 bg-black">
        <div className="text-6xl font-sans font-semibold text-center mt-16 pt-4">
          <label>Welcome!</label>
        </div>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mt-2 flex justify-center">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="bg-black block w-1/3 py-1.5 px-3 mt-9 border-b-2 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email here"
            />
          </div>
          <div className=" flex justify-center">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              className="bg-black block w-1/3 border-b-2 py-1.5 px-3 mt-6 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-12 mt-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            >
              LOG IN
            </button>
          </div>
          <div className="flex justify-center font-size-sm font-light mt-2">
            <p>Forgot Password?</p>
          </div>
          <div class="flex items-center mt-6 w-1/4 mx-[37.5%]">
            <div class="flex-grow border-b border-gray-400"></div>
            <div class="px-4 text-gray-600">OR</div>
            <div class="flex-grow border-b border-gray-400"></div>
          </div>
          <div className="font-semibold flex justify-center mt-4 text-2xl">
            <p>Continue with</p>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-block ml-3"
            >
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
            <button onClick={() => setIsOpen(!isOpen)} className="ml-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 40 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.65196 30.5C3.57946 30.5 2.66101 30.1325 1.89661 29.3975C1.13221 28.6625 0.750656 27.78 0.751956 26.75V4.25C0.751956 3.21875 1.13416 2.33563 1.89856 1.60063C2.66296 0.865628 3.58076 0.498753 4.65196 0.500003H35.852C36.9245 0.500003 37.8429 0.867503 38.6073 1.6025C39.3717 2.3375 39.7533 3.22 39.752 4.25V26.75C39.752 27.7812 39.3698 28.6644 38.6054 29.3994C37.841 30.1344 36.9232 30.5012 35.852 30.5H4.65196ZM20.252 17.375L4.65196 8V26.75H35.852V8L20.252 17.375ZM20.252 13.625L35.852 4.25H4.65196L20.252 13.625ZM4.65196 8V4.25V26.75V8Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p>
              Don't you have an account?{" "}
              <span className="text-blue-400">Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
