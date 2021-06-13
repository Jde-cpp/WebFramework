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
##################
if [ ! -d $workspace ]; then
	ng new $workspace --create-application=$createApplication --routing=false --style=scss;
	cd $workspace;
	sed -i 's/"strict": true,/"strict": true,"strictPropertyInitialization": false, "strictNullChecks": false, "noImplicitAny": false, "noImplicitThis":false,/' tsconfig.json;
	#npm install -g @angular/cli@latest;
	ng analytics off;
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
function execute()
{
	file=$1;
	if [ -f  $file ];then
		t=$(stat -c "%a %n" $file); if [[ ${t:0:1} != "7" ]] ; then chmod 7${t:1:2} $file; fi;
		$file;
	fi;
}
##################
for librarySubDir in "${libraries[@]}"; do
	echo $librarySubDir - processing;
	libraryDir=$REPO_WEB/$librarySubDir;
	dest=`jq -r .name $libraryDir/control/package.json`
	#dest=`perl -MJSON -e '$/ = undef; my $data = <>; for my $hash (new JSON->incr_parse($data)) { print $hash->{name}; }' < $libraryDir/control/package.json`;
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
	execute $libraryDir/$library.sh;
	execute $libraryDir/$library-proto.sh;
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