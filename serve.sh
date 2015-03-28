#!/bin/bash

npm install
npm install nodemon
cd cauliflower
npm install
cd ../broccoli-typescript
npm install
cd ..
$(npm bin)/nodemon --watch Brocfile.js --watch cauliflower/index.js --watch broccoli-typescript/index.js cauliflower
