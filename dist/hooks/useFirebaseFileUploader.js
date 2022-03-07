"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _storage = require("firebase/storage");

var _lodash = require("lodash");

var _shortid = _interopRequireDefault(require("shortid"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const getFileName = (payload, file, includeExt) => {
  //function to use a custom filename with a filename prop in the config or generate random filename
  const ext = includeExt ? file === null || file === void 0 ? void 0 : file.type.replace(/(.*)\//g, "") : "";

  if ((0, _lodash.isFunction)(payload)) {
    return payload("".concat(file === null || file === void 0 ? void 0 : file.name, ".").concat(ext));
  }

  return "".concat(payload, ".").concat(ext) || _shortid.default.generate();
};

const useFirebaseFileUploader = config => {
  // State para las Imagenes
  const [uploading, setUploading] = (0, _react.useState)(false);
  const [progress, setProgress] = (0, _react.useState)(0);
  const [fileURL, setFileUrl] = (0, _react.useState)("");
  const [fileName, setFileName] = (0, _react.useState)("");
  const [originalFileName, setOriginalFileName] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)(null);

  const FileUploaderUI = /*#__PURE__*/_react.default.forwardRef((props, inputRef) => {
    // Funcion para subir la imagen
    const handleUploadStart = snapshot => {
      const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      setProgress(progress);
    };

    const handleUploadError = error => {
      setUploading(false);
      setError(error);
      console.log(error);
    };

    const handleUploadChange = event => {
      setOriginalFileName(event.target.files[0].name);
      setUploading(true);
      const file = event.target.files[0];
      const fileName = getFileName(config === null || config === void 0 ? void 0 : config.filename, file, config === null || config === void 0 ? void 0 : config.includeExt);
      setFileName(fileName);
      if (!file) return;
      const storageRef = (0, _storage.ref)(config.storage, "".concat(config.path, "/").concat(fileName));
      const uploadTask = (0, _storage.uploadBytesResumable)(storageRef, file);
      uploadTask.on("state_changed", handleUploadStart, handleUploadError, async () => {
        const url = await (0, _storage.getDownloadURL)(uploadTask.snapshot.ref);
        setFileUrl(url);
        setUploading(false);
      });
    };

    return /*#__PURE__*/_react.default.createElement("input", _extends({
      type: "file",
      onChange: handleUploadChange,
      disabled: uploading,
      ref: inputRef
    }, props));
  });

  return {
    uploading,
    progress,
    fileURL,
    fileName,
    originalFileName,
    error,
    FileUploaderUI
  };
};

var _default = useFirebaseFileUploader;
exports.default = _default;
useFirebaseFileUploader.propTypes = {
  config: _propTypes.default.shape({
    storage: _propTypes.default.object.isRequired,
    path: _propTypes.default.string.isRequired,
    includeExt: false
  })
};