#!/bin/bash
baseDir=`pwd`;
clientDir=$baseDir/source/ClientApp;

source common.sh

cd $baseDir;
moveToDir proto;
	ln -s ../../../AppServer/source/types/proto/FromClient.proto appFromClient.proto;
	ln -s ../../../AppServer/source/types/proto/FromServer.proto appFromServer.proto;
	cd $clientDir;
	npm install protobufjs --save;
	npx pbjs -r app_from_client -t static-module -w es6 -o src/app/proto/appFromClient.js ../../proto/appFromClient.proto & npx pbts -o src/app/proto/appFromClient.d.ts src/app/proto/appFromClient.js;
	npx pbjs -r app_from_server -t static-module -w es6 -o src/app/proto/appFromServer.js ../../proto/appFromServer.proto & npx pbts -o src/app/proto/appFromServer.d.ts src/app/proto/appFromServer.js;
	
