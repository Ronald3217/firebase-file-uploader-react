
# Change Log
### firebase-file-uploader-react
React component to upload files to Firebase Storage.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [1.0.5] - 2024-01-18
 
The code was rewritten with TypeScript, and the Dependencies were updated.
Maintaining the same syntax to avoid errors in existing applications.
 
### Added
- We changed the compilation from SWC to tsup.
 
### Changed
- Updated and moved to Peer Dependencies YOU MUST INSTALL IT:
    - "firebase": "^10.7.2",
    - "react": "^18.0.2",
    - "react-dom": "^18.0.2"
- Moved to devDependencies:
    - "@types/lodash": "^4.14.202",
    - "@types/react": "^18.2.48",
    - "ts-node": "^10.9.2",
    - "tsup": "^8.0.1",
    - "typescript": "^5.3.3"
    - "@swc/cli": "^0.1.63",
    - "@swc/core": "^1.3.104",
- Peer Dependencies YOU MUST INSTALL IT:
    - "firebase": "^10.7.2",
    - "react": "^18.0.2",
    - "react-dom": "^18.0.2"
- **You must install the above peerDependencies for the component to work (ignore if you already have them added to your project).**

### Removed
- Removed devDependencies:
    - @babel/cli
    - @babel/core
    - @babel/preset-env
    - @babel/preset-react
 
## [1.0.1] - [1.0.4] 
 
### Fixed
 
## [1.0.0] - 2023-05-09
 
### Initial Release