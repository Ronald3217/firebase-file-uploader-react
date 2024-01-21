import * as React from 'react';
import { FirebaseStorage, StorageError } from 'firebase/storage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const useFirebaseFileUploader: (config: {
    storage: FirebaseStorage;
    path: string;
    includeExt?: boolean | undefined;
    filename?: string | ((filename: string) => string) | undefined;
}) => {
    uploading: boolean;
    progress: number;
    fileURL: string;
    fileName: string;
    originalFileName: string;
    fileType: string;
    error: boolean | StorageError;
    FileUploaderUI: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
};

export { useFirebaseFileUploader };
