import React, { useState } from "react";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { isFunction } from "lodash";
import shortid from "shortid";
import PropTypes from "prop-types";

const getFileName = (payload, file) => {
  //function to use a custom filename with a filename prop in the config or generate random filename
  if (isFunction(payload)) {
    return payload(file.name);
  }
  return payload || shortid.generate();
};

const useFirebaseFileUploader = (config) => {
  // State para las Imagenes
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [error, setError] = useState(null);

  const FileUploaderUI = ({ innerRef, ...props }) => {
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
      const fileName = getFileName(config?.filename, file);
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
    return (
      <input
        type="file"
        onChange={handleUploadChange}
        disabled={uploading}
        ref={innerRef}
        {...props}
      />
    );
  };
  return {
    uploading,
    progress,
    fileURL,
    fileName,
    originalFileName,
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
