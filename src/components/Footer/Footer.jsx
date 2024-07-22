


function Footer() {
    
  return (
    <div className="bg-slate-200">
      <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 ">
        <div>
          <h2 className="mb-6 text-lg text-gray-900  uppercase dark:text-white font-semibold ">
            Company
          </h2>
          <ul className="text-gray-500 dark:text-gray-900 font-medium cursor-pointer  ">
            <li className="mb-4 hover:underline hover:text-slate-700">About</li>
            <li className="mb-4 hover:underline hover:text-slate-700">
              careers
            </li>
            <li className="mb-4 hover:underline hover:text-slate-700">Team</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-lg text-gray-900  uppercase dark:text-white font-semibold ">
            Contact us
          </h2>
          <ul className="text-gray-500 dark:text-gray-900 font-medium cursor-pointer">
            <li className="mb-4 hover:underline hover:text-slate-700">
              Help & Support
            </li>
            <li className="mb-4 hover:underline hover:text-slate-700">
              Partner with us
            </li>
            <li className="mb-4 hover:underline hover:text-slate-700">
              Ride with us
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-lg text-gray-900  uppercase dark:text-white font-semibold ">
            Legal
          </h2>
          <ul className="text-gray-500 dark:text-gray-900 font-medium cursor-pointer">
            <li className="mb-4 hover:underline hover:text-slate-700">
              Terms & Conditions
            </li>
            <li className="mb-4 hover:underline hover:text-slate-700">
              Cookies Policy
            </li>
            <li className="mb-4 hover:underline hover:text-slate-700">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-lg text-gray-900  uppercase dark:text-white font-semibold ">
            social links
          </h2>
          <div>
            <ul className="flex gap-2 cursor-pointer">
              <li
                className="mb-4 list-none"
             >
            <i className="fa-brands fa-square-instagram"></i>
              </li>
              <li className="mb-4 list-none">
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li className="mb-4 list-none">
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li className="mb-4 list-none">
                <i className="fa-brands fa-youtube"></i>
              </li>
              <li className="mb-4 list-none">
                <i className="fa-brands fa-square-twitter"></i>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                  alt=""
                  className="w-20"
                />
              </li>
              <li>
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
                  alt=""
                  className="w-20"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black text-white p-3 text-center">
        <p>
          All trademarks, logos and names are properties of their respective
          owners. All Rights Reserved. © Copyright 2024 DreamLoomReality Realty
          Services Limited
        </p>

        <div className="flex gap-10 justify-center text-lg ">
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer