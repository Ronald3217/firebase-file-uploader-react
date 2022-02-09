import React from "react";

const FileUploader = (props, { handleUploadChange, uploading }) => {
  return (
    <input
      type="file"
      onChange={handleUploadChange}
      disabled={uploading}
      {...props}
    />
  );
};
export default FileUploader;
