#!/bin/bash
#libraries=("WebBlockly")
#./create-workspace.sh "${libraries[@]}"
workspace=${1:-my-workspace};
createApplication=${2:-false};
librariesText=( "$@" );
declare -a libraries=();
#libraryLog=""
#for i in "${!foo[@]}"; do
for i in "${!librariesText[@]}"; do if (( $i > 1 )); then t=${librariesText[$i]}; libraries+=$t; libraryLog="$libraryLog $t";  fi; done
echo create-workspace.sh workspace=$workspace createApplication=$createApplication librares=\"${libraryLog:1}\"
baseDir=`pwd`;
if [ -z $REPO_BASH ]; then REPO_BASH=${REPO_DIR////\\}; REPO_BASH=${REPO_BASH/\\c/c:}; fi;
source $REPO_BASH/jde/Framework/common.sh;
REPO_WEB=$REPO_BASH/jde/web;
##################
if [ ! -d $workspace ]; then
	ng new $workspace --create-application=$createApplication --routing=false --style=scss;
	cd $workspace;
	sed -i 's/"strict": true,/"strict": true,"strictPropertyInitialization": false, "strictNullChecks": false, "noImplicitAny": false, "noImplicitThis":false,/' tsconfig.json;
	npm install -g @angular/cli@latest;
	npm install material-design-icons;
	ng add @angular/material --defaults --skip-confirmation;
	npm install @types/long --save;
	npm install protobufjs --save;

	cd src;
	printf "\nimport * as protobuf from 'protobufjs/minimal';\nimport * as Long from 'long';\n\nprotobuf.util.Long = Long;\nprotobuf.configure();" >> main.ts;
	cd ..;
else
	cd $workspace;
fi;
pushd `pwd` > /dev/null;

##################
for librarySubDir in "${libraries[@]}"; do
	echo $librarySubDir - processing;
	libraryDir=$REPO_WEB/$librarySubDir;
	dest=`perl -MJSON -e '$/ = undef; my $data = <>; for my $hash (new JSON->incr_parse($data)) { print $hash->{name}; }' < $libraryDir/control/package.json`;
	library=$( basename $dest );
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
	if [ -f  $libraryDir/$library.sh ];then $libraryDir/$library.sh; fi;
	if [ -f  $libraryDir/$library-proto.sh ];then $libraryDir/$library-proto.sh; fi;
	ng build $library;
	if [ $? -ne 0 ]; then
		echo `pwd`;
		echo ng build $library;
		exit 1;
	fi;
	echo pwd=`pwd`;
	cd dist/$library;
	echo pwd=`pwd`;
	#npm pack;
done;



