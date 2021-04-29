#!/bin/bash

windows() { [[ -n "$WINDIR" ]]; }

function addLink
{
	if [ -L $2 ]; then
		rm $2;
	fi;
	if [ -f $2 ]; then
		rm $2;
	fi;
	if windows; then
		source=$1/$2;
		source=${source////\\}
		#echo $source
		source=${source/\\c/c:}
		#echo start
		#echo "mklink $2 $source"
		cmd <<< "mklink $2 $source" > /dev/null
	else
		ln -s $1/$2 .;
	fi;
};

function moveToDir
{
	if [ ! -d $1 ]; then mkdir $1; fi;
	cd $1;
};

function addHard
{
	if [ -f $2 ]; then rm $2; fi;
	if windows; then
		source=$1/$2;
		source=${source////\\}
		source=${source/\\c/c:}
		cmd <<< "mklink /H $2 $source" > /dev/null
	else
		ln $1/$2 .;
	fi;

};

function addHardDir
{
	if windows; then
		source=$1/$2;
		source=${source////\\}
		source=${source/\\c/c:}
		echo "mklink /D /H $2 $source"
		cmd <<< "mklink /D /H $2 $source" > /dev/null
	else
		moveToDir $2;
		for filename in $1/$2/*; do
			ln $filename .;
		done;
	fi;
	cd ..;
}
