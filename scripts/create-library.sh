#!/bin/bash
library=${1};  #jde-blockly
dir=${2}; #WebBlockly
webRoot=$(dirname $(readlink -e ..)) #jde/web
source $webRoot/../Framework/scripts/common.sh;
controlDir=$webRoot/$dir/control;
if [ \"$(head -c 2 tsconfig.json)\" == \"/*\" ]; then
	echo "removing comments";
	sed -i '1d' tsconfig.json;
fi;
if [ ! -d projects/$library ]; then #project not installed
	configPath=.compilerOptions.paths.\"$library\"
	angularConfig=`jq .projects.\"$library\".root angular.json`;
	if [ ! -z "$angularConfig" ]; then
	#if [ ! "$angularConfig" -eq "null" ]; then
		echo removing from [angular][tsconfig].json;
		cmd="del(.projects.\"$library\")"
		jq $cmd angular.json > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq $cmd angular.json; exit 1; fi;
		mv temp.json angular.json;
		cmd="del($configPath)";
		jq $cmd tsconfig.json > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq $cmd tsconfig.json; exit 1; fi;
		mv temp.json tsconfig.json;
	fi;

	ng analytics off;#should add to angular.json "cli": {"analytics": false},
	ng g library $library --defaults; if [ $? -ne 0 ]; then echo `pwd`; echo ng g library $library --defaults; exit 1; fi;
	configConent="[\"./projects/$library/src/public-api\", \"./dist/$library/$library\", \"./dist/$library\"]";
	#seems to be failing because of comments:  if [ \"$(head -c 2 tsconfig.json)\" == \"/*\" ]; then sed -i '1d' tsconfig.json; fi; should take care of it
	jq "$configPath = $configConent" tsconfig.json > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq \"$configPath = $configConent\" tsconfig.json; exit 1; fi;
	mv temp.json tsconfig.json;
fi;
cd projects/$library;
if [ -f $controlDir/package.json ]; then addHard package.json $controlDir; fi;
if [ -f $controlDir/tsconfig.lib.json ]; then addHard tsconfig.lib.json $controlDir; fi;
#if [ -d $controlDir/environments ]; then addHardDir environments $controlDir; fi;
#if [ -d $controlDir/styles ]; then addHardDir styles $controlDir; fi;
cd src;
addHard public-api.ts $controlDir/src;
cd lib;
if [ -f $library.component.ts ]; then rm $library.component.*; fi;
if [ -f $library.service.ts ]; then rm $library.service.*; fi;