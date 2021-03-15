#!/usr/local/bin/bash

stty -echo
URL="https://particle-piano.herokuapp.com/note"

declare -A keyMap
keyMap[a]=0
keyMap[s]=1
keyMap[d]=3
keyMap[f]=4
keyMap[g]=5
keyMap[h]=6
keyMap[j]=7
keyMap[k]=8
keyMap[l]=9
keyMap[\;]=10

while [ : ]
do
    read -n 1 INDEX 
    index=${keyMap[$INDEX]}
    echo "POST to server with data $index"
    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"data": {"index":'"$index"'}}'\
        -s $URL
done