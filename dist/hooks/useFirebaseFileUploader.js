"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _storage = require("firebase/storage");

var _shortid = _interopRequireDefault(require("shortid"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useFirebaseFileUploader = config => {
  // State para las Imagenes
  const [uploading, setUploading] = (0, _react.useState)(false);
  const [progress, setProgress] = (0, _react.useState)(0);
  const [fileURL, setFileUrl] = (0, _react.useState)("");
  const [fileName, setFileName] = (0, _react.useState)("");
  const [originalFileName, setOriginalFileName] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)(null);

  const FileUploaderUI = props => {
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

      const fileName = _shortid.default.generate();

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

    return /*#__PURE__*/React.createElement("input", _extends({
      type: "file",
      onChange: handleUploadChange,
      disabled: uploading
    }, props));
  };

  return {
    uploading,
    progress,
    fileURL,
    fileName,
    error,
    FileUploaderUI
  };
};

var _default = useFirebaseFileUploader;
exports.default = _default;
useFirebaseFileUploader.propTypes = {
  config: _propTypes.default.shape({
    storage: _propTypes.default.object.isRequired,
    path: _propTypes.default.string.isRequired
  })
};