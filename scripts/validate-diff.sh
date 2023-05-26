#! /usr/bin/env bash

diff -q $1 $2
FILE_CHANGED=$?

if [ $FILE_CHANGED -ne 0 ]; then
    echo "ERROR: $1 is not equal to $2." > /dev/stderr
    exit 1
else
    echo "$1 is identical to $2."
    exit 0
fi