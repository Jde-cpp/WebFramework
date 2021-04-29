#!/bin/bash
cwd=`pwd`;
cd $clientDir;
npm install protobufjs --save;

cd node_modules;
moveToDir jde-cpp;
	addLink $baseDir/../../AppServer/source/types/proto FromClient.proto
	addLink $baseDir/../../AppServer/source/types/proto FromServer.proto
	npx pbjs -r app_from_client -t static-module -w es6 -o appFromClient.js FromClient.proto & npx pbts -o appFromClient.d.ts appFromClient.js;
	npx pbjs -r app_from_server -t static-module -w es6 -o appFromServer.js FromServer.proto & npx pbts -o appFromServer.d.ts appFromServer.js;

source ./createProject.sh jde-framework WebFramework
moveToDir services
#addHardDir $controlDir/src/lib/services error
cp -r $controlDir/src/lib/services/error .;
cp -r $controlDir/src/lib/services/profile .;
addHard $controlDir/src/lib/services IGraphQL.ts;

cd ..;
moveToDir shared;
#addHardDir $controlDir/src/lib/shared date-range;
cp -r $controlDir/src/lib/shared/date-range .;
cp -r $controlDir/src/lib/shared/link-select .;
cp -r $controlDir/src/lib/shared/paginator .;
cp -r $controlDir/src/lib/shared/severity-picker .;

#addHardDir $controlDir/src/lib utilities;
cp -r $controlDir/src/lib/utilities .;
cd $cwd;