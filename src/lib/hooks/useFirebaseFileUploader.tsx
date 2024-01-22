import * as React from "react";
import { ref as firebaseRef, uploadBytesResumable, getDownloadURL, FirebaseStorage, UploadTaskSnapshot, StorageError } from "firebase/storage";
import { isFunction } from "lodash";
import { nanoid } from "nanoid";

export interface getFileName {
  payload?: string | ((filename: string) => string),
  file: File,
}
export interface ConfigInterface {
  storage: FirebaseStorage,
  path: string,
  includeExt?: boolean
  filename?: string | ((filename: string) => string),
}
export interface HookValues {
  uploading: boolean,
  progress: number,
  fileURL: string,
  fileName: string,
  fileType: string,
  originalFileName: string,
  error: StorageError | boolean,
  FileUploaderUI: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const getFileName = ({ payload, file }: getFileName) => {
  //function to use a custom filename with a filename prop in the config or generate random filename
  if (isFunction(payload)) {
    return payload(file?.name);
  }
  return payload || nanoid();
};
/**
 * React.js Custom Hook to upload files to a firebase storage instance.
 * @param config -{@link ConfigInterface} Hook Config.
 * @param config.storage - FirebaseStorage instance.
 * @param config.path - Path where the files will be uploaded.
 * @param config.includeExt - boolean, if you want to include the extension in the file name.
 * @param config.filename - Function to rename the file ex: (filename)=> "t-shirt" . ex 2: (filename)=> filename - to keep the original name.
 * @returns HookValues - {@link HookValues} Returns the following values: uploading,progress, fileURL, fileName, fileType, originalFileName, error.
 */
const useFirebaseFileUploader = (config: ConfigInterface): HookValues => {
  // State para las Imagenes
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [fileURL, setFileUrl] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");
  const [fileType, setFileType] = React.useState<string>("");
  const [originalFileName, setOriginalFileName] = React.useState<string>("");
  const [error, setError] = React.useState<StorageError | boolean>(false);

  const Input:React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
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
      const storageRef = firebaseRef(storage, `/${path}/${uploadfileName}`);
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
        {...props}
        ref={ref}
      />
    );
  }

  const FileUploaderUI = React.forwardRef(Input);
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
