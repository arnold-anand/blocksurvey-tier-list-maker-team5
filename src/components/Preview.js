import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nhost } from "../lib/nhost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Preview() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tierImages, setTierImages] = useState({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
  });
  const [imageGallery, setImageGallery] = useState([1, 2, 3, 4, 5, 6, 7]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleTierClick = (tier) => {
    setSelectedTier(tier);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToTier = () => {
    if (selectedTier && selectedImage) {
      // Update the tierImages state with the selected image
      setTierImages((prevTierImages) => ({
        ...prevTierImages,
        [selectedTier.id]: [...prevTierImages[selectedTier.id], selectedImage],
      }));

      // Remove the selected image from the image gallery
      setImageGallery((prevImageGallery) =>
        prevImageGallery.filter((img) => img !== selectedImage)
      );

      // Clear selectedImage
      setSelectedImage(null);
    }
  };

  const handleRemoveFromTier = () => {
    if (selectedTier && selectedImage) {
      // Remove the selected image from the tier
      setTierImages((prevTierImages) => ({
        ...prevTierImages,
        [selectedTier.id]: prevTierImages[selectedTier.id].filter(
          (img) => img !== selectedImage
        ),
      }));

      // Add the selected image back to the image gallery
      setImageGallery((prevImageGallery) =>
        [...prevImageGallery, selectedImage].sort()
      );

      // Clear selectedImage
      setSelectedImage(null);
    }
  };

  const [shareModalVisible, setShareModalVisible] = useState(false);

  const openShareModal = () => {
    setShareModalVisible(true);
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const handleCopyLink = () => {
    const linkToCopy = "https://tieron.com/140/best-movies-of-the-21st-century"; // Replace with your actual link

    navigator.clipboard.writeText(linkToCopy).then(
      function () {
        toast.success("Link copied to clipboard!", {
          position: "bottom-right", // Provide the position as a string
        });
      },
      function (err) {
        toast.error("Failed to copy link!", {
          position: "bottom-right", // Provide the position as a string
        });
        console.error("Unable to copy to clipboard.", err);
      }
    );
  };


  return (
    <div className="h-max bg-[#F8F7F4]">
      <div className="flex items-center justify-between p-6">
        <div className="font-abril-fatface text-3xl">Tieron</div>
        <div>
          <div className="flex items-center justify-center space-x-3">
            <Link to="/new">
              <button className="bg-black h-[39px] w-[139px] text-white rounded-[8px] font-open-sans text-[14px]">
                Create Tieron
              </button>
            </Link>
            <button
              onClick={toggleDropdown}
              className="bg-white p-[3px] rounded-full"
            >
              <img
                className="w-[38px] h-[38px] rounded-full"
                src="profile.png"
                alt=""
              />
              {dropdownVisible && (
                <div className="absolute mt-2 right-3 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => nhost.auth.signOut()}
                      className="text-center w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="px-[165px]">
        {/* Tier_main table */}
        <div className="flex items-center justify-between">
          <div className="flex item-center space-x-3">
            {/* Thumbnail goes here */}
            <div className="bg-black bg-opacity-[10%] w-[160px] h-[160px] rounded-[8px]"></div>
            <div className="flex flex-col space-y-4 text-left">
              <div className="font-montserrat text-[20px]">
                Best Movies of the 21st Century{" "}
              </div>
              {/* Description goes here */}
              <div className="font-open-sans text-[16px] w-[640px]">
                Explore the pinnacle of cinematic brilliance with our curated
                tier list of the 21st century's most impactful and unforgettable
                films.
              </div>
              {/* Category */}
              <div className="font-open-sans text-[16px]">Category: Movies</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button className="border-[1px] border-black w-[71px] h-[35px] rounded-[8px]">
              Edit
            </button>
            <button
              onClick={openShareModal}
              className="border-[1px] border-black w-[71px] h-[35px] rounded-[8px] mt-[8px] mx-5"
            >
              Share
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black bg-opacity-[10%] my-[16px]"></div>
        {/* Tiers */}
        <div className="flex flex-col items-center space-y-[8px]">
          {/* Tier elements */}
          {[
            { id: "S", name: "S" },
            { id: "A", name: "A" },
            { id: "B", name: "B" },
            { id: "C", name: "C" },
            { id: "D", name: "D" },
          ].map((tier) => (
            <div
              key={tier.id}
              onClick={() => handleTierClick(tier)}
              className={`w-full h-[84px] bg-black bg-opacity-[6%] 
      rounded-[8px] flex items-center justify-start p-[10px] ${
        selectedTier && selectedTier.id === tier.id
          ? "border-2 border-blue-500"
          : ""
      }`}
            >
              <div className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3">
                {tier.name}
              </div>
              {/* for images */}
              {tierImages[tier.id].map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(image)}
                  className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3 mx-1 cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Image Gallery */}

        <div className="font-open-sans text-[18px] text-left my-[16px]">
          Image Gallery
        </div>

        <div className="h-[165px] w-full bg-black bg-opacity-[6%] rounded-[8px] p-[10px] flex flex-wrap items-center space-x-3">
          {/* Image elements */}
          {[
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-2.jpg",
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-3.jpg",
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-51.jpg",
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-50.jpg",
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-49.jpg",
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-47.jpg",
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750/https://assets.designhill.com/design-blog/wp-content/uploads/2022/10/1-46.jpg",
          ].map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(image)}
              className={`w-[65px] h-[65px] bg-black bg-opacity-[10%] rounded-[8px] ${
                selectedImage === image ? "border-2 border-blue-500" : ""
              } cursor-pointer`}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-[8px]"
              />
            </div>
          ))}
        </div>
        <div className="py-5">
          {/* Add to Tier button */}
          <button
            onClick={handleAddToTier}
            className="border-[1px] border-black w-[120px] h-[35px] rounded-[8px] mt-[16px]"
          >
            Add to Tier
          </button>

          {/* Remove from Tier button */}
          <button
            onClick={handleRemoveFromTier}
            className="border-[1px] border-black w-[160px] h-[35px] rounded-[8px] mt-[8px] mx-5"
          >
            Remove from Tier
          </button>

          <Link to="/dashboard">
          <button
            onClick={handleRemoveFromTier}
            className="border-[1px] bg-black text-white border-black w-[160px] h-[35px] rounded-[8px] mt-[8px] mx-5"
          >
            Submit
          </button>
          </Link>
        </div>
      </div>
      {/* Share  */}
      {shareModalVisible && (
        <div className="bg-black bg-opacity-[20%] absolute top-0 h-screen w-full">
          <div className="flex items-center justify-center h-screen">
            <div className="w-[520px] h-[444px] bg-white rounded-[8px]">
              <div className="px-[20px] py-[16px] flex items-center justify-between">
                <div className="font-montserrat text-[18px]">
                  Share your Tieron List!
                </div>
                {/* Close button */}
                <button onClick={closeShareModal}>
                  <div>
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div className="h-[1px] bg-black bg-opacity-[10%]"></div>
              <div className="mt-[54px] mx-[65px] font-open-sans text-[14px]">
                Share a link to this Template without including your ranking
              </div>
              <div className="w-[387px] h-[39px] bg-black bg-opacity-[4%] mx-[66px] rounded-[8px] mt-[16px] font-open-sans text-[14px] pt-2">
                https://tieron.com/140/best-movies-of-the-21st-century
              </div>
              <div>
                <button  onClick={handleCopyLink} className="w-[97px] h-[35px] border-[1px] border-black rounded-[8px] mt-[12px]">
                  Copy Link
                </button>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="qr.png"
                  alt=""
                  className="w-[150px] h-[150px] rounded-[8px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
