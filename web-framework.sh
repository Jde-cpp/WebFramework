#!/bin/bash
#npm install -g @angular/cli
baseDir=`pwd`;
source ../../Framework/common.sh;
if [ ! -d my-workspace ];
then
	ng new my-workspace --create-application=false;
	./framework-proto.sh;
	# cd my-workspace;
	# npm install protobufjs --save;
	# cd node_modules;
	# moveToDir jde-cpp;
	# mklink FromClient.proto $baseDir/../../AppServer/source/types/proto;
	# mklink FromServer.proto $baseDir/../../AppServer/source/types/proto;
	# npx pbjs -r app_from_client -t static-module -w es6 -o appFromClient.js FromClient.proto;
	# npx pbts -o appFromClient.d.ts appFromClient.js;
	# npx pbjs -r app_from_server -t static-module -w es6 -o appFromServer.js FromServer.proto;
	# npx pbts -o appFromServer.d.ts appFromServer.js;
else
	cd my-workspace;
fi;
workspace=`pwd`;
if [ ! -d projects/jde-framework ]; then
	create-project.sh jde-framework WebFramework;
	controlLib=$controlDir/src/lib
	moveToDir services;
	addHardDir error $controlLib/services;
	addHardDir profile $controlLib/services;
	addHard IGraphQL.ts $controlLib/services;
	cd ..;
	moveToDir shared;
	addHardDir date-range $controlLib/shared;
	addHardDir link-select $controlLib/shared;
	addHardDir paginator $controlLib/shared;
	addHardDir severity-picker $controlLib/shared;
	cd ..;
	addHardDir utilities $controlDir/src/lib;
	cd $workspace;
fi;
npm install -g @angular/cli@latest;
npm install @types/long --save;
npm install material-design-icons;
ng add @angular/material --defaults;

ng build jde-framework;
cd dist/jde-framework;
npm pack;
