import * as React from "react";
import { ref, uploadBytesResumable, getDownloadURL, FirebaseStorage, UploadTaskSnapshot, StorageError } from "firebase/storage";
import { isFunction } from "lodash";
import { nanoid } from "nanoid";

interface getFileName {
  payload?: (filename:string) => string | string,
  file: File
}
interface config {
  storage: FirebaseStorage,
  path: string,
  includeExt?: boolean
  filename?: (filename:string) => string | string,
}

const getFileName = ({ payload, file }: getFileName) => {
  //function to use a custom filename with a filename prop in the config or generate random filename
  if (isFunction(payload)) {
    return payload(file?.name);
  }
  return payload || nanoid();
};

const useFirebaseFileUploader = (config: config) => {
  // State para las Imagenes
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [fileURL, setFileUrl] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [fileType, setFileType] = React.useState("");
  const [originalFileName, setOriginalFileName] = React.useState("");
  const [error, setError] = React.useState<StorageError>();

  const FileUploaderUI = React.forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, inputRef: React.LegacyRef<HTMLInputElement>) => {
    // Funcion para subir la imagen
    const handleUploadStart = (snapshot: UploadTaskSnapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    };
    const handleUploadError = (error: StorageError) => {
      setUploading(false);
      setError(error);
      console.log(error);
    };
    const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLInputElement;
      const file = target.files![0];
      setOriginalFileName(file.name);
      setFileType(file.type);
      setUploading(true);
      const ext = config?.includeExt ? file?.type.replace(/(.*)\//g, "") : null;
      const { filename, storage, path } = config
      const uploadfileName = ext
        ? getFileName({ payload: filename, file }) + "." + ext
        : getFileName({ payload: filename, file });
      setFileName(uploadfileName);
      if (!file) return;
      const storageRef = ref(storage, `${path}/${fileName}`);
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
export {
  useFirebaseFileUploader
}
