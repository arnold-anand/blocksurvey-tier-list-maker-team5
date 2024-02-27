import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function StepThree() {
  const inputFile = useRef(null);
  const thumbnailInput = useRef(null);

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const onButtonClick = (inputRef) => {
    // Trigger the click event of the file input
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // Avoid memory leak
      );
    }
  };

  const onThumbnailChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const thumbnailUrl = URL.createObjectURL(e.target.files[0]);
      setThumbnail(thumbnailUrl);
    }
  };

  return (
    <div>
      <div className="font-open-sans text-[20px] my-3 text-left">
        Upload your Images
      </div>
      <div className="flex items-center justify-between mr-20">
        <div className="w-[578px] h-[184px] relative">
          <input
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0,
            }}
            type="file"
            id="my-file"
            ref={inputFile}
            onChange={onFileChange}
            multiple // Allow multiple files
          />
          <button
            onClick={() => onButtonClick(inputFile)}
            className="w-full h-full bg-black bg-opacity-[2%] rounded-[8px] border-[1px] border-black border-opacity-[12%] relative"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[40px] h-[40px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <div className="font-open-sans text-[16px]">
                Drag images here or click to select files
              </div>
              <div className="font-open-sans text-black text-[14px] text-opacity-[70%]">
                Attach as many files as you like, each file should not exceed
                5mb
              </div>
            </div>
          </button>
        </div>

        <div>
          <input
            style={{ display: "none" }}
            type="file"
            id="thumbnail"
            ref={thumbnailInput}
            onChange={onThumbnailChange}
          />
          <button
            onClick={() => onButtonClick(thumbnailInput)}
            className="w-[184px] h-[184px] bg-black bg-opacity-[2%] rounded-[8px] border-[1px] border-black border-opacity-[12%]"
          >
            {/* render the thumbnail here itself */}
            <div className="">
              <div className="h-full">
                <div className="flex flex-col space-y-5 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
                <div className="text-16px font-open-sans">Add Thumbnail</div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="font-open-sans text-[20px] my-3 text-left font-thin">
        Image Gallery (No. of files uploaded: {images.length})
      </div>
      {/* Render images and thumbnail here */}
      <div className="flex space-x-3 space-y-3 flex-wrap w-[60%]">
        <div></div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`preview ${index}`}
            className="max-h-32 max-w-32 object-cover rounded-[8px]"
          />
        ))}
      </div>
      <div className="font-open-sans text-[20px] my-3 text-left font-thin">
        Thumbnail
      </div>
      <div>
        {thumbnail && (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="max-h-32 max-w-32 object-cover my-3 rounded-[8px]"
          />
        )}
      </div>
      <div className="flex items-start">
        <Link to="/preview">
          <button
            className="w-[107px] h-[39px] bg-black rounded-[8px] text-white text-[12px] mt-4"
            // onClick={handleContinue}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
