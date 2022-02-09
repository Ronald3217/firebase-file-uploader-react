import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import shortid from "shortid";
import PropTypes from "prop-types";
import FileUploader from "../components/FileUploader";

const useFirebaseFileUploader = (config) => {
  // State para las Imagenes
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [error, setError] = useState(null);

  // Funcion para subir la imagen
  const handleUploadStart = (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgress(progress);
  };
  const handleUploadError = (error) => {
    setUploading(false);
    setError(error);
    console.log(error);
  };
  const handleUploadChange = (event) => {
    setOriginalFileName(event.target.files[0].name);
    setUploading(true);
    const file = event.target.files[0];
    const fileName = shortid.generate();
    setFileName(fileName);
    if (!file) return;
    const storageRef = ref(config.storage, `${config.path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      handleUploadStart,
      handleUploadError,
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setFileUrl(url);
        setUploading(false);
      }
    );
  };

  const FileUploaderUI = (props) => {
    return (
      <FileUploader
        type="file"
        onChange={handleUploadChange}
        disabled={uploading}
        {...props}
      />
    );
  };
  return {
    uploading,
    progress,
    fileURL,
    fileName,
    error,
    FileUploaderUI,
  };
};

export default useFirebaseFileUploader;

useFirebaseFileUploader.propTypes = {
  config: PropTypes.shape({
    storage: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
  }),
};
