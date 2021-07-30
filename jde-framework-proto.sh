#!/bin/bash
baseDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
jdeRoot=$baseDir/../..;
source $jdeRoot/Framework/common.sh;
pushd `pwd` > /dev/null;
cd node_modules;
moveToDir jde-cpp;
mklink FromClient.proto $jdeRoot/Public/jde/log/types/proto;
mklink FromServer.proto $jdeRoot/Public/jde/log/types/proto;
npx pbjs -r app_from_client -t static-module -w es6 -o FromClient.js FromClient.proto;
npx pbts -o FromClient.d.ts FromClient.js;
npx pbjs -r app_from_server -t static-module -w es6 -o FromServer.js FromServer.proto;
npx pbts -o FromServer.d.ts FromServer.js;
popd > /dev/null;
echo jde-framework-proto.sh complete.