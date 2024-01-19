import * as React from 'react';
import { StorageError, FirebaseStorage } from 'firebase/storage';

interface config {
    storage: FirebaseStorage;
    path: string;
    includeExt?: boolean;
    filename?: (filename: string) => string | string;
}
declare const useFirebaseFileUploader: (config: config) => {
    uploading: boolean;
    progress: number;
    fileURL: string;
    fileName: string;
    originalFileName: string;
    fileType: string;
    error: StorageError | undefined;
    FileUploaderUI: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;
};

export { useFirebaseFileUploader };
