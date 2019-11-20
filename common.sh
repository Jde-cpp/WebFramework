#!/bin/bash

function addLink
{
	if [ -L $2 ]; then
		rm $2;
	fi;
	if [ -f $2 ]; then
		rm $2;
	fi;
	ln -s $1/$2 .;
};

function moveToDir
{
	if [ ! -d $1 ]; then mkdir $1; fi;
	cd $1;
};

function addHard
{
	ln $1/$2 .;
};

function addHardDir
{
	moveToDir $2;
	for filename in $1/$2/*; do
		ln $filename .;
	done;
	cd ..;
}
