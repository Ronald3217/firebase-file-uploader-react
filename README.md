# Firebase File Uploader React

## React component for uploading files to Firebase

You need to initialize a firebase application and create the storage object.

```bash
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const Firebase = {
  storage,
};

export default Firebase;
export { storage };
```

### How To Install?

```bash
npm i firebase-file-uploader-react
```

### Custom Hook Required Config object:

```
const config = {
    storage,
    path: 'products'
    filename?: 'shirt' optional: STRING or FUNCTION for custom filename\
    or uploaded cloud file,as FUNCTION passes the original filename as\
    func args e.g filename: (originalFilename)=>{ return `${originalFilename}-fancyname`}
}
```

### How To Use?

```bash
import { useFirebaseFileUploader } from 'firebase-file-uploader-react';

const someComponent = ()=>(
    const { FileUploaderUI, uploading, progress, error, fileURL } =
    useFirebaseFileUploader({
      storage,
      path: "products",
      filename: "t-shirt"
    });
    <FileUploaderUI
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        accept="image/*"
        id="imagen"
        name="imagen"
        draggable="true"
      />
)
```

### Style

### this component haven't any style;

You can use the way you like to style it.

### FileUploaderUI Default Props

| Prop |   Type   |  Is Required?  | Comment          |
| :--: | :------: | :------------: | ---------------- |
| type | property | Default (file) | Read more in MDN |

##### Accept input type file properties
