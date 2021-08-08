#!/bin/bash
#npm install -g @angular/cli
library=${1};  #jde-blockly
dir=${2}; #WebBlockly
if [ -z $baseDir ]; then baseDir=`pwd`/..; fi;
if [ -z $commonBuild ]; then source $baseDir/../../Framework/common.sh; fi;
controlDir=$(dirname $(readlink -e $baseDir/../$dir/control))/control;
jqApp=$( windows && echo ~/jq-win64.exe || echo jq );

if [ ! -d projects/$library ]; then
	t=`$jqApp .projects.\"$library\".root angular.json`;
	if [ $t != "null" ]; then
		echo removing from [angular][tsconfig].json;
		if [ \"$(head -c 2 tsconfig.json)\" == \"/*\" ]; then sed -i '1d' tsconfig.json; fi;
		cmd="del(.projects.\"$library\")"
		$jqApp $cmd angular.json > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq $cmd angular.json; exit 1; fi;
		mv temp.json angular.json;
		cmd="del(.compilerOptions.paths.\"$library\")";
		$jqApp $cmd tsconfig.json > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq '$cmd' tsconfig.json; exit 1; fi;
		mv temp.json tsconfig.json;
	fi;
	#echo not removing from [angular][tsconfig].json

	ng analytics project off;#should add to angular.json "cli": {"analytics": false},
	ng g library $library --defaults;
	if [ $? -ne 0 ]; then echo `pwd`; echo ng g library $library --defaults; exit 1; fi;
fi;
cd projects/$library;
if [ -f $controlDir/package.json ]; then addHard package.json $controlDir; fi;
if [ -f $controlDir/tsconfig.lib.json ]; then addHard tsconfig.lib.json $controlDir; fi;
#sed -i 's/"strict": true,/"strict": true,"strictPropertyInitialization": false, "strictNullChecks": false, "noImplicitAny": false,/' tsconfig.lib.json;
cd src;
addHard public-api.ts $controlDir/src;
cd lib;
#addHard $library.module.ts $controlDir/src/lib;
if [ -f $library.component.ts ]; then rm $library.component.*; fi;
if [ -f $library.service.ts ]; then rm $library.service.*; fi;
