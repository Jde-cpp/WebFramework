#!/bin/bash
baseDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
jdeRoot=$baseDir/../..;
source $jdeRoot/Framework/common.sh;
pushd `pwd` > /dev/null;
if [ ! -d node_modules ]; then echo run from workspace dir.; exit 1; fi;
cd node_modules;
moveToDir jde-cpp;
error()
{
    echo "(${BASH_LINENO[0]}) $BASH_COMMAND";
    exit $errorCode;
}
trap error ERR;
mklink FromClient.proto $jdeRoot/Public/jde/log/types/proto;
mklink FromServer.proto $jdeRoot/Public/jde/log/types/proto;
#npm install protobufjs
#npm install protobufjs-cli
npx pbjs -r app_from_client -t static-module -w es6 -o FromClient.js FromClient.proto;
npx pbts -o FromClient.d.ts FromClient.js;
npx pbjs -r app_from_server -t static-module -w es6 -o FromServer.js FromServer.proto;
npx pbts -o FromServer.d.ts FromServer.js;
popd > /dev/null;
echo jde-framework-proto.sh complete.