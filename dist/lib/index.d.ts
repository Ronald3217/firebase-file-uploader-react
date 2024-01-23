import * as React from 'react';
import { FirebaseStorage, StorageError } from 'firebase/storage';

/**
 * Represents the configuration object for firebase-file-uploader-react custom hook.
 */
interface ConfigInterface {
    /**
     * Represents the Firebase storage instance.
     */
    storage: FirebaseStorage;
    /**
     * Specifies the path for the storage location.
     */
    path: string;
    /**
     * Optional boolean flag to include file extensions.
     */
    includeExt?: boolean;
    /**
     * Optional parameter to specify the filename or a function to generate the filename.
     */
    filename?: string | ((filename: string) => string);
}
interface HookValues {
    /**
    * Represents if the file is uploading.
    */
    uploading: boolean;
    /**
     * Represents the progress of the file upload.
     */
    progress: number;
    /**
     * Represents the URL of the uploaded file.
     */
    fileURL: string;
    /**
     * Represents the name of the uploaded file.
     */
    fileName: string;
    /**
     * Represents the type of the uploaded file.
     */
    fileType: string;
    /**
     * Represents the original name of the file before upload.
     */
    originalFileName: string;
    /**
     * Represents any error that occurred during file storage, or a boolean value indicating success.
     */
    error: StorageError | boolean;
    /**
     * Represents the React component for the file uploader UI.
     */
    FileUploaderUI: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
/**
 * React.js Custom Hook to upload files to a firebase storage instance.
 * @param config -{@link ConfigInterface} Hook Config.
 * @param config.storage - FirebaseStorage instance.
 * @param config.path - Path where the files will be uploaded.
 * @param config.includeExt - boolean, if you want to include the extension in the file name.
 * @param config.filename - Function to rename the file ex: (filename)=> "t-shirt" . ex 2: (filename)=> filename - to keep the original name.
 * @returns HookValues - {@link HookValues} Returns the following values: uploading,progress, fileURL, fileName, fileType, originalFileName, error.
 */
declare const useFirebaseFileUploader: (config: ConfigInterface) => HookValues;

export { useFirebaseFileUploader };
