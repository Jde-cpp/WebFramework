#!/bin/bash
clean=${1:-0};
baseDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
jdeRoot=$baseDir/../..;
source $jdeRoot/Framework/common.sh;
pushd `pwd` > /dev/null;
if [ ! -d node_modules ]; then echo run from workspace dir.; exit 1; fi;
npm list | grep protobufjs &> /dev/null;
if [ $? -ne 0 ]; then
	echo installing protobufjs
	npm install protobufjs
	npm install protobufjs-cli
fi;
cd node_modules;
moveToDir jde-cpp;
mklink FromClient.proto $jdeRoot/Public/jde/log/types/proto;
mklink FromServer.proto $jdeRoot/Public/jde/log/types/proto;
#mklink BaseFromServer.proto $jdeRoot/Public/src/io/proto;

npx pbjs -r app_from_client -t static-module -w es6 -o FromClient.js FromClient.proto;
npx pbts -o FromClient.d.ts FromClient.js;
npx pbjs -r app_from_server -t static-module -w es6 -o FromServer.js FromServer.proto;
npx pbts -o FromServer.d.ts FromServer.js;

#npx pbjs -r from_server -t static-module -w es6 -o BaseFromServer.js BaseFromServer.proto;
#npx pbts -o BaseFromServer.d.ts BaseFromServer.js;

popd > /dev/null;
echo jde-framework-proto.sh complete.