import React, { useState } from 'react';
import { nhost } from '../lib/nhost';


function UploadInput({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await nhost.storage.upload({ file: selectedFile });
      const publicUrl = await nhost.storage.getPublicUrl({ fileId: result.fileMetadata.id });

      onUpload({ result, name: selectedFile.name }); // Pass image URL and name
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadInput;
