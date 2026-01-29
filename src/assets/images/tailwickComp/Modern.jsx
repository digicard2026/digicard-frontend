// import React from "react";

// // Image
// import logoLight from "../../../assets/images/logo-dark.png";
// import modern from "../../../assets/images/logo-light.png";
// import { Link } from "react-router-dom";

// const Modern = () => {
//     return (
//         <React.Fragment>
//             <div className="relative z-10 flex items-center justify-center min-h-screen px-10 text-center grow py-14">
//                 <div>
//                     <Link to="/">
//                         <img src={logoLight} alt="" className="block mx-auto mb-14 h-7" />
//                     </Link>
//                     <img src={modern} alt="" className="block object-cover mx-auto shadow-lg md:max-w-md rounded-xl shadow-custom-800" />
//                     <div className="mt-10 text-center">
//                         <h3 className="mt-4 mb-3 capitalize text-custom-50">Tools for crafting your business's brand identity</h3>
//                         <p className="max-w-2xl text-custom-300 text-16">Unlock the potential of our versatile branding tools, designed to empower your business in shaping a distinctive and impactful brand. Elevate your business's image and leave a lasting impression with our comprehensive branding solutions.</p>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// export default Modern;
import React from "react";
import { Link } from "react-router-dom";

// Images
import logoLight from "../../../assets/images/logo-dark.png";
// import modern from "../../../assets/images/logo-light.png";
import revayahlogolight from "../../../assets/images/revayah-logo-light.png";

const Modern = () => {
    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-10 text-center grow py-14">
            <div>
                            
                <Link to="/">
                <img src={revayahlogolight} alt="" className="block object-cover mx-auto  md:max-w-md p-4 shadow-lg rounded-xl bg-white" />
                </Link>
                <div className="mt-10 text-center">
                    <h3 className="text-2xl font-bold text-white dark:text-white mb-7">Tools for crafting your business's brand identity</h3>
                    <p className="max-w-2xl text-white text-20">
                        Unlock the potential of our versatile branding tools, designed to empower your business in shaping a distinctive and impactful brand. 
                        Elevate your business's image and leave a lasting impression with our comprehensive branding solutions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Modern;