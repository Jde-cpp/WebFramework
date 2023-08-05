#!/bin/bash
#sudo npm install -g @angular/cli@latest
#sudo npm install -g npm@latest
#sudo apt  install jq
#chmod 777 ../WebFramework/jde-framework-proto.sh
#run from my-workspace/..
#../WebFramework/create-workspace.sh my-workspace MaterialSite WebFramework TwsWebsite WebBlockly
workspace=${1:-my-workspace};
librariesText=( "$@" );
declare -a libraries=();
for i in "${!librariesText[@]}"; do if (( $i > 0 )); then t=${librariesText[$i]}; libraries+=($t); libraryLog="$libraryLog $t";  fi; done;
echo create-workspace.sh workspace=$workspace librares=\"${libraryLog:1}\"

scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $scriptDir/../../Framework/common.sh;
baseDir=`pwd`;
REPO_WEB=`readlink -f $scriptDir/..`;
findExecutable npm;
if [ ! -x "$(which "ng" 2> /dev/null)" ]; then
	cmd="npm install -g @angular/cli";
	echo d;
	if windows; then
		$cmd;
	else
		sudo $cmd;
	fi;
	if [ $? -ne 0 ]; then echo `pwd`; echo $cmd; exit 1; fi;
fi;
##################
echo e;
if [ ! -d $workspace ]; then
	echo -------------------- create workspace start --------------------;
	createApplication=true;
	cmd="ng new $workspace --create-application=$createApplication --defaults --routing=false --style=scss"
	$cmd; if [ $? -ne 0 ]; then echo $cmd; exit 1; fi;
	echo -------------------- create workspace complete --------------------;
	cd $workspace;
	command="jq '.projects.\"$workspace\".architect.build.configurations.production.budgets[0].maximumError = \"5mb\"' angular.json"
	eval $command > angular2.json; rm angular.json; mv angular2.json angular.json;
	sed -i 's/"strict": true,/"strict": true,"strictPropertyInitialization": false, "strictNullChecks": false, "noImplicitAny": false, "noImplicitThis":false, "skipLibCheck": true, "allowSyntheticDefaultImports":true,/' tsconfig.json;
	command="jq '.cli.analytics = false' angular.json"
	eval $command > angular2.json; rm angular.json; mv angular2.json angular.json;
	#ng analytics disable;
	echo -------------------- npm install start --------------------;
	npm install material-design-icons;
	echo -------------------- icons installed --------------------;
	ng add @angular/material --defaults --skip-confirmation; #use skip-confirmation when interactive
	echo -------------------- material installed --------------------;
	#echo `pwd`;
	#exit 1;
	npm install @types/long --save;
	npm install protobufjs --save;
	echo -------------------- protobufjs stuff --------------------;
	npm --silent install chalk@^4.0.0;
	npm --silent install jsdoc@^3.6.3;
	npm --silent install uglify-js@^3.7.7;
	echo -------------------- npm install complete --------------------;
	echo `pwd`;
	cd src;
	printf "\nimport * as protobuf from 'protobufjs/minimal';\nimport Long from 'long';\n\nprotobuf.util.Long = Long;\nprotobuf.configure();" >> main.ts;
	cd ..;
else
	echo workspace already exists
	cd $workspace;
fi;
pushd `pwd` > /dev/null;
##################
function execute()
{
	file=$1;
	if [ -f  $file ];then
		t=$(stat -c "%a %n" $file); if [[ ${t:0:1} != "7" ]] ; then chmod 7${t:1:2} $file; fi;
		$file;
	fi;
}
##################
startDir=`pwd`;
echo -------------------- Start Libraries --------------------;
for librarySubDir in "${libraries[@]}"; do
	echo $librarySubDir - processing;
	libraryDir=$REPO_WEB/$librarySubDir;
	#findExecutable jq
	dest=`jq -r .name $libraryDir/control/package.json`
	#dest=`perl -MJSON -e '$/ = undef; my $data = <>; for my $hash (new JSON->incr_parse($data)) { print $hash->{name}; }' < $libraryDir/control/package.json`;
	library=$( basename $dest );
	if [ $? -ne 0 ]; then echo $dest failed; exit 1; fi;
	if [ ! -d projects/$library ]; then
		$REPO_WEB/WebFramework/create-library.sh $library $librarySubDir; if [ $? -ne 0 ]; then echo `pwd`; echo $REPO_WEB/WebFramework/create-library.sh $library $librarySubDir; exit 1; fi;
	fi;
	cd $baseDir/$workspace/projects/$library/src;
	if [ -d $libraryDir/control/src/lib ]; then addHardDir lib $libraryDir/control/src; fi;
	if [ -d $libraryDir/control/src/assets ]; then addHardDir assets $libraryDir/control/src; fi;
	if [ -d $libraryDir/control/src/styles ]; then addHardDir styles $libraryDir/control/src; fi;
	cd $baseDir/$workspace;
	execute $libraryDir/$library.sh;
	execute $libraryDir/$library-proto.sh;
	#if release-mode then
	#ng build $library; if [ $? -ne 0 ]; then echo `pwd`; echo ng build $library; exit 1; fi;
	#cd dist/$library; npm pack;
	cd $startDir
done;
echo -------------------- End Libraries --------------------;
jq '.angularCompilerOptions["strictTemplates"] = 'false'' tsconfig.json  > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq '$cmd' tsconfig.json; exit 1; fi;
mv temp.json tsconfig.json;
echo create-workspace.sh success