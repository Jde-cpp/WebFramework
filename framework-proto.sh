#!/bin/bash
baseDir=SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
jdeRoot=$baseDir/../..;
source $jdeRoot/Framework/common.sh;
pushd `pwd`;
cd node_modules;
moveToDir jde-cpp;
mklink FromClient.proto $jdeRoot/AppServer/source/types/proto;
mklink FromServer.proto $jdeRoot/AppServer/source/types/proto;
npx pbjs -r app_from_client -t static-module -w es6 -o appFromClient.js FromClient.proto;
npx pbts -o appFromClient.d.ts appFromClient.js;
npx pbjs -r app_from_server -t static-module -w es6 -o appFromServer.js FromServer.proto;
npx pbts -o appFromServer.d.ts appFromServer.js;
popd;