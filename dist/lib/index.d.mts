import * as React from 'react';
import { FirebaseStorage, StorageError } from 'firebase/storage';

type config = {
    storage: FirebaseStorage;
    path: string;
    includeExt?: boolean;
    filename?: string | ((filename: string) => string);
};
type HookValues = {
    uploading: boolean;
    progress: number;
    fileURL: string;
    fileName: string;
    fileType: string;
    originalFileName: string;
    error: StorageError | boolean;
    FileUploaderUI: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement>>;
};
declare const useFirebaseFileUploader: (config: config) => HookValues;

export { useFirebaseFileUploader };
