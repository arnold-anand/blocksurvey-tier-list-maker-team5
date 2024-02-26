import React from "react";

export default function Home() {
  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between p-6">
        <div className="font-abril-fatface text-3xl">Tieron</div>
        <div>
          <div className="flex items-center justify-center space-x-3">
            <button className="bg-black h-[39px] w-[139px] text-white rounded-[8px] font-open-sans text-[14px]">
              Create Tieron
            </button>
            <button className="bg-white p-[3px] rounded-full">
              <img
                className="w-[38px] h-[38px] rounded-full"
                src="profile.png"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-[72px] mt-20">
          <span className="font-montserrat">Welcome to </span>
          <span className="font-abril-fatface">Tieron!</span>
        </div>
        <div className="text-[18px] text-black text-opacity-50 font-open-sans font-medium">
          Rank, Share, Discover - Where Your Opinions Take Center Stage
        </div>
        <button className="bg-black h-[42px] w-[152px] text-white rounded-[8px] font-open-sans text-[14px] my-10">
          Create Tieron
        </button>
      </div>
    </div>
  );
}
