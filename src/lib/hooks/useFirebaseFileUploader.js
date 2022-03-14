import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { isFunction } from "lodash";
import shortid from "shortid";
import PropTypes from "prop-types";

const getFileName = (payload, file) => {
  //function to use a custom filename with a filename prop in the config or generate random filename
  if (isFunction(payload)) {
    return payload(file?.name);
  }
  return payload || shortid.generate();
};

const useFirebaseFileUploader = (config) => {
  // State para las Imagenes
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [error, setError] = useState(null);

  const FileUploaderUI = React.forwardRef((props, inputRef) => {
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
      const file = event.target.files[0];
      setOriginalFileName(file.name);
      setFileType(file.type);
      setUploading(true);
      const ext = config?.includeExt ? file?.type.replace(/(.*)\//g, "") : null;
      const fileName = ext
        ? getFileName(config?.filename, file) + "." + ext
        : getFileName(config?.filename, file);
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
        ref={inputRef}
        {...props}
      />
    );
  });
  return {
    uploading,
    progress,
    fileURL,
    fileName,
    originalFileName,
    fileType,
    error,
    FileUploaderUI,
  };
};

export default useFirebaseFileUploader;

useFirebaseFileUploader.propTypes = {
  config: PropTypes.shape({
    storage: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    includeExt: PropTypes.bool,
  }),
};
