# Firebase File Uploader React

## React component for uploading files to Firebase

You need to initialize a firebase application and create the storage object.

```js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

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
    includeExt?: false optional:BOOLEAN to include file extension type to file name
    filename?: (filename) => "t-shirt", optional: STRING or FUNCTION for custom filename\
    or uploaded cloud file,as FUNCTION passes the original filename as\
    func args e.g filename: (originalFilename)=>{ return `${originalFilename}-fancyname`}\
    e.g 2 filename: (originalFilename)=>originalFilename to keep original filename
}
```

### How To Use?

```js
import { useFirebaseFileUploader } from 'firebase-file-uploader-react';

const App = () => {
    const { FileUploaderUI, uploading, progress, error, fileURL, originalFilename, inputElement, fileType } =
    useFirebaseFileUploader({
      storage,
      path: "products",
      filename: "t-shirt"
    });
    return (
      <FileUploaderUI
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        accept="image/*"
        id="imagen"
        name="imagen"
        draggable="true"
      />
    )
}
```

### Style

### this component haven't any style;

You can use the way you like to style it.

### FileUploaderUI Default Props

| Prop |   Type   |  Is Required?  | Comment          |
| :--: | :------: | :------------: | ---------------- |
| type | property | Default (file) | Read more in MDN |

##### Accept input type file properties
