import * as React from "react";
import { ref, uploadBytesResumable, getDownloadURL, FirebaseStorage, UploadTaskSnapshot, StorageError } from "firebase/storage";
import { isFunction } from "lodash";
import { nanoid } from "nanoid";

interface getFileName {
  payload?: string | ((filename: string) => string),
  file: File,
}
interface config {
  storage: FirebaseStorage,
  path: string,
  includeExt?: boolean
  filename?: string | ((filename: string) => string),
}
interface HookValues {
  uploading: boolean,
  progress: number,
  fileURL: string,
  fileName: string,
  fileType: string,
  originalFileName: string,
  error: StorageError | undefined
  FileUploaderUI: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement>>
}

const getFileName = ({ payload, file }: getFileName) => {
  //function to use a custom filename with a filename prop in the config or generate random filename
  if (isFunction(payload)) {
    return payload(file?.name);
  }
  return payload || nanoid();
};

const useFirebaseFileUploader = (config: config): HookValues => {
  // State para las Imagenes
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [fileURL, setFileUrl] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");
  const [fileType, setFileType] = React.useState<string>("");
  const [originalFileName, setOriginalFileName] = React.useState<string>("");
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
      const { includeExt, filename, storage, path } = config
      const ext = includeExt ? file?.type.replace(/(.*)\//g, "") : null;
      const uploadfileName = ext
        ? getFileName({ payload: filename, file }) + "." + ext
        : getFileName({ payload: filename, file });
      setFileName(uploadfileName);
      if (!file) return;
      const storageRef = ref(storage, `/${path}/${uploadfileName}`);
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
