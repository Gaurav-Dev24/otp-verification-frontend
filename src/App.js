import React, { useEffect, useRef, useState } from "react";
import "./App.css";

let currentOTPIndex = 0;

const OTPField = (props) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef(null);

  const handleOnChange = ({ target }) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace" ) setActiveOTPIndex(currentOTPIndex - 1);
    };
  

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <>
    {/* Header section */}
      <div className="mt-[10rem] flex flex-col justify-center items-center space-x-2">
        <h1 className="mb-[2rem]  font-bold text-4xl">Phone Verification</h1>
        <p className="mb-[2rem] text-[2rem] text-neutral-500">Enter the OTP you received on 89206-6XXXX</p>
      </div>

{/* Input Section */}
      <div className="flex justify-center items-center space-x-2 mb-[2rem]">
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={index === activeOTPIndex ? inputRef : null}
                type="number"
                className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl  border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition spin-button-none"
                onChange={handleOnChange}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                value={otp[index]}
              />
              {index === otp.length - 1 ? null : (
                <span className="w-2 py-0.5 bg-gray-400" />
              )}
            </React.Fragment>
          );
        })}
        </div>
      {/* Footer */}
        <div className=" flex justify-center items-center space-x-[8rem] mb-8">
          <span className="text-blue-800 text-[20px]">Change Number</span>
          <span className="text-blue-800 text-[20px]">Re-send OTP</span>
        </div>

        <div className="flex justify-center items-center ">
          <button className="text-[2rem] border-2 rounded-full border-none bg-green-600 text-white py-[3px] px-[50px]">Verify Phone Number</button>
        </div>
        
        
    </>
  );
};

export default OTPField;
