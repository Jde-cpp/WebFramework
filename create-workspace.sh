#!/bin/bash
#sudo npm install -g @angular/cli@latest
#sudo npm install -g npm@latest
#sudo apt  install jq
#chmod 777 ../WebFramework/jde-framework-proto.sh
#run from my-workspace/..
#../WebFramework/create-workspace.sh my-workspace false MaterialSite WebFramework TwsWebsite WebBlockly
workspace=${1:-my-workspace};
createApplication=${2:-false};
librariesText=( "$@" );
declare -a libraries=();
for i in "${!librariesText[@]}"; do if (( $i > 1 )); then t=${librariesText[$i]}; libraries+=($t); libraryLog="$libraryLog $t";  fi; done;
echo create-workspace.sh workspace=$workspace createApplication=$createApplication librares=\"${libraryLog:1}\"

scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $scriptDir/../../Framework/common.sh;
baseDir=`pwd`;
REPO_WEB=`readlink -f $scriptDir/..`;
findExecutable npm;
if [ ! -x "$(which "ng" 2> /dev/null)" ]; then npm install -g @angular/cli; fi;
jqApp=jq;#$( windows && echo ~/jq-win64.exe || echo jq );
##################
if [ ! -d $workspace ]; then
	echo -------------------- create workspace start --------------------;
	ng new $workspace --create-application=$createApplication --routing=false --style=scss;
	echo -------------------- create workspace complete --------------------;
	cd $workspace;
	command="$jqApp '.projects.\"$workspace\".architect.build.configurations.production.budgets[0].maximumError = \"5mb\"' angular.json"
	eval $command > angular2.json; rm angular.json; mv angular2.json angular.json;
	sed -i 's/"strict": true,/"strict": true,"strictPropertyInitialization": false, "strictNullChecks": false, "noImplicitAny": false, "noImplicitThis":false,/' tsconfig.json;
	ng analytics off;
	echo -------------------- npm install start --------------------;
	npm install material-design-icons;
	echo -------------------- icons installed --------------------;
	ng add @angular/material --defaults --skip-confirmation; #use skip-confirmation when interactive
	echo -------------------- material installed --------------------;
	#echo `pwd`;
	#exit 1;
	npm install @types/long --save;
	npm install protobufjs --save;
	echo -------------------- npm install complete --------------------;
	cd src;
	printf "\nimport * as protobuf from 'protobufjs/minimal';\nimport * as Long from 'long';\n\nprotobuf.util.Long = Long;\nprotobuf.configure();" >> main.ts;
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
for librarySubDir in "${libraries[@]}"; do
	echo $librarySubDir - processing;
	libraryDir=$REPO_WEB/$librarySubDir;
	#findExecutable jq
	dest=`$jqApp -r .name $libraryDir/control/package.json`
	#dest=`perl -MJSON -e '$/ = undef; my $data = <>; for my $hash (new JSON->incr_parse($data)) { print $hash->{name}; }' < $libraryDir/control/package.json`;
	library=$( basename $dest );
	if [ $? -ne 0 ]; then echo $dest failed; exit 1; fi;
	if [ ! -d projects/$library ]; then
		$REPO_WEB/WebFramework/create-library.sh $library $librarySubDir;
		if [ $? -ne 0 ]; then
			echo `pwd`;
			echo $REPO_WEB/WebFramework/create-library.sh $library $librarySubDir;
			exit 1;
		fi;
	fi;
	cd $baseDir/$workspace/projects/$library/src;
	if [ -d $libraryDir/control/src/lib ]; then addHardDir lib $libraryDir/control/src; fi;
	if [ -d $libraryDir/control/src/lib ]; then addHardDir assets $libraryDir/control/src; fi;
	if [ -d $libraryDir/control/src/lib ]; then addHardDir styles $libraryDir/control/src; fi;
	cd $baseDir/$workspace;
	execute $libraryDir/$library.sh;
	execute $libraryDir/$library-proto.sh;
	ng build $library;
	if [ $? -ne 0 ]; then
		echo `pwd`;
		echo ng build $library;
		exit 1;
	fi;
	#echo pwd=`pwd`;
	cd dist/$library;
	#echo pwd=`pwd`;
	npm pack;
	cd $startDir
done;