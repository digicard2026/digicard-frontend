// // import { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import authEmail from "../../assets/images/landing/auth-email.png";

// // function EmailVerify() {
// //   const { token } = useParams();
// //   const [message, setMessage] = useState("Verifying...");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     document.title = "Verify Email | Digi_Card Admin Dashboard";

// //     document.body.classList.add(
// //       "flex",
// //       "items-center",
// //       "justify-center",
// //       "min-h-screen",
// //       "py-10",
// //       "bg-cover",
// //       "bg-auth-pattern",
// //       "dark:bg-auth-pattern-dark",
// //       "dark:text-zink-100",
// //       "font-public"
// //     );

// //     return () => {
// //       document.body.classList.remove(
// //         "flex",
// //         "items-center",
// //         "justify-center",
// //         "min-h-screen",
// //         "py-10",
// //         "bg-cover",
// //         "bg-auth-pattern",
// //         "dark:bg-auth-pattern-dark",
// //         "dark:text-zink-100",
// //         "font-public"
// //       );
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const verify = async () => {
// //       try {
// //         const response = await fetch(
// //           `${import.meta.env.VITE_API_URL}/api/v1/user/verify-email/${token}`
// //         );

// //         const data = await response.json();

// //         if (response.ok) {
// //           setSuccess(true);
// //           setMessage("🎉 Your email has been verified successfully! You can now log in.");
// //         } else {
// //           setSuccess(false);
// //           setMessage(data.message || "Verification failed!");
// //         }
// //       } catch (err) {
// //         setSuccess(false);
// //         setMessage("Something went wrong");
// //       }
// //     };

// //     verify();
// //   }, [token]);

// //   return (
// //     <div className="mb-0 border-none lg:w-[480px] card bg-white/90 shadow-xl rounded-2xl dark:bg-zink-600/70 backdrop-blur-md">
// //       <div className="px-10 py-12 card-body">

// //         <div className="text-center">
// //           <h4 className="text-2xl font-semibold text-custom-500 dark:text-custom-400 mb-3">
// //             {success ? "Email Verified" : "Verification Status"}
// //           </h4>

// //           <p className="mb-6 text-slate-600 dark:text-zink-200 text-sm leading-relaxed">
// //             {message}
// //           </p>

// //           {success && (
// //             <Link
// //               to="/signin"
// //               className="w-[120px] mx-auto block text-center px-3 py-2 text-sm font-medium text-white 
// //               bg-blue-600 border border-blue-600 rounded-lg
// //               hover:bg-blue-700 hover:border-blue-700 
// //               transition-all duration-200 shadow-md"
// //             >
// //               Go to Login
// //             </Link>
// //           )}
// //         </div>

// //         <div className="pt-10 text-center">
// //           <img
// //             src={authEmail}
// //             alt="Email Verified"
// //             className="block w-[65%] mx-auto drop-shadow-md"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EmailVerify;


// import { useEffect, useState, useRef } from "react";
// import { useParams, Link } from "react-router-dom";
// import authEmail from "../../assets/images/landing/auth-email.png";

// function EmailVerify() {
//   const { token } = useParams();
//   const [message, setMessage] = useState("Verifying...");
//   const [success, setSuccess] = useState(false);

//   // 🔒 Prevent double API call
//   const hasCalledRef = useRef(false);

//   useEffect(() => {
//     document.title = "Verify Email | Digi_Card Admin Dashboard";

//     document.body.classList.add(
//       "flex",
//       "items-center",
//       "justify-center",
//       "min-h-screen",
//       "py-10",
//       "bg-cover",
//       "bg-auth-pattern",
//       "dark:bg-auth-pattern-dark",
//       "dark:text-zink-100",
//       "font-public"
//     );

//     return () => {
//       document.body.classList.remove(
//         "flex",
//         "items-center",
//         "justify-center",
//         "min-h-screen",
//         "py-10",
//         "bg-cover",
//         "bg-auth-pattern",
//         "dark:bg-auth-pattern-dark",
//         "dark:text-zink-100",
//         "font-public"
//       );
//     };
//   }, []);

//   useEffect(() => {
//     if (hasCalledRef.current) return;   // 🚫 stop second call
//     hasCalledRef.current = true;

//     const verify = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/v1/user/verify-email/${token}`
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setSuccess(true);
//           setMessage(data.message || "🎉 Your email has been verified successfully! You can now log in.");
//         } else {
//           setSuccess(false);
//           setMessage(data.message || "Verification failed!");
//         }
//       } catch (err) {
//         setSuccess(false);
//         setMessage("Something went wrong");
//       }
//     };

//     verify();
//   }, [token]);

//   return (
//     <div className="mb-0 border-none lg:w-[480px] card bg-white/90 shadow-xl rounded-2xl dark:bg-zink-600/70 backdrop-blur-md">
//       <div className="px-10 py-12 card-body">
//         <div className="text-center">
//           <h4 className="text-2xl font-semibold text-custom-500 dark:text-custom-400 mb-3">
//             {success ? "Email Verified" : "Verification Status"}
//           </h4>

//           <p className="mb-6 text-slate-600 dark:text-zink-200 text-sm leading-relaxed">
//             {message}
//           </p>

//           {success && (
//             <Link
//               to="/signin"
//               className="w-[120px] mx-auto block text-center px-3 py-2 text-sm font-medium text-white 
//               bg-blue-600 border border-blue-600 rounded-lg
//               hover:bg-blue-700 hover:border-blue-700 
//               transition-all duration-200 shadow-md"
//             >
//               Go to Login
//             </Link>
//           )}
//         </div>

//         <div className="pt-10 text-center">
//           <img
//             src={authEmail}
//             alt="Email Verified"
//             className="block w-[65%] mx-auto drop-shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmailVerify;


import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import authEmail from "../../assets/images/landing/auth-email.png";

function EmailVerify() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState(null);   // 👈 store user role

  // 🔒 Prevent double API call
  const hasCalledRef = useRef(false);

  useEffect(() => {
    document.title = "Verify Email | Digi_Card Admin Dashboard";

    document.body.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen",
      "py-10",
      "bg-cover",
      "bg-auth-pattern",
      "dark:bg-auth-pattern-dark",
      "dark:text-zink-100",
      "font-public"
    );

    return () => {
      document.body.classList.remove(
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "py-10",
        "bg-cover",
        "bg-auth-pattern",
        "dark:bg-auth-pattern-dark",
        "dark:text-zink-100",
        "font-public"
      );
    };
  }, []);

  useEffect(() => {
    if (hasCalledRef.current) return;   // 🚫 stop second call
    hasCalledRef.current = true;

    const verify = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/verify-email/${token}`
        );

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setMessage(
            data.message ||
              "🎉 Your email has been verified successfully! You can now log in."
          );
          setRole(data.role);  // 👈 capture role from backend
        } else {
          setSuccess(false);
          setMessage(data.message || "Verification failed!");
        }
      } catch (err) {
        setSuccess(false);
        setMessage("Something went wrong");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="mb-0 border-none lg:w-[480px] card bg-white/90 shadow-xl rounded-2xl dark:bg-zink-600/70 backdrop-blur-md">
      <div className="px-10 py-12 card-body">
        <div className="text-center">
          <h4 className="text-2xl font-semibold text-custom-500 dark:text-custom-400 mb-3">
            {success ? "Email Verified" : "Verification Status"}
          </h4>

          <p className="mb-6 text-slate-600 dark:text-zink-200 text-sm leading-relaxed">
            {message}
          </p>

          {success && (
            <Link
              to={
                  role === "customer"
                  ? "/signin"
                  :"/signin/partner"
              }
              className="w-[120px] mx-auto block text-center px-3 py-2 text-sm font-medium text-white 
              bg-blue-600 border border-blue-600 rounded-lg
              hover:bg-blue-700 hover:border-blue-700 
              transition-all duration-200 shadow-md"
            >
              Go to Login
            </Link>
          )}
        </div>

        <div className="pt-10 text-center">
          <img
            src={authEmail}
            alt="Email Verified"
            className="block w-[65%] mx-auto drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
