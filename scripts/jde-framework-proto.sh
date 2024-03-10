#!/bin/bash
clean=${1:-0};
baseDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." &> /dev/null && pwd )"
webDir=$(dirname $(readlink -e $baseDir));
jdeRoot=$(dirname $(readlink -e $webDir));
jdeBash=$jdeRoot;
source $jdeRoot/Framework/scripts/common.sh;
frameworkDir=$baseDir;
source $frameworkDir/scripts/common-proto.sh;

if [ ! -d node_modules ]; then echo run from workspace dir.; exit 1; fi;
npm list | grep protobufjs &> /dev/null;
if [ $? -ne 0 ]; then
	echo installing protobufjs
	npm install protobufjs
	npm install protobufjs-cli
fi;
cd projects/jde-framework/src/lib;
moveToDir proto;
declare -A commonFiles;
if [ ! -f FromServer.d.ts ] || [ $clean == 1 ]; then commonFiles[FromServer]=from_server_root; fi;
create $jdeBash/Public/src/web/proto commonFiles;
echo 'Created common proto files';

declare -A appFiles;
if [ ! -f AppFromClient.d.ts ] || [ $clean == 1 ]; then appFiles[AppFromClient]=app_from_client; fi;
if [ ! -f AppFromServer.d.ts ] || [ $clean == 1 ]; then appFiles[AppFromServer]=app_from_server; fi;
echo 'Creating application proto files';
create $jdeBash/Public/jde/appServer/proto appFiles;
echo 'Created application proto files';

echo jde-framework-proto.sh complete.