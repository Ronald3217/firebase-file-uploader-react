import * as React from 'react';
import { FirebaseStorage, StorageError } from 'firebase/storage';

interface ConfigInterface {
    storage: FirebaseStorage;
    path: string;
    includeExt?: boolean;
    filename?: string | ((filename: string) => string);
}
interface HookValues {
    uploading: boolean;
    progress: number;
    fileURL: string;
    fileName: string;
    fileType: string;
    originalFileName: string;
    error: StorageError | boolean;
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
