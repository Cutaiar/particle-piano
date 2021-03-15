#! /usr/bin/env bash

URL="https://particle-piano.herokuapp.com/note"

while [ : ]
do
    now=$(date +"%r")
    index=$(( ( RANDOM % 11 ) ))
    echo "POST to server with data $index at $now"
    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"data": {"index":'"$index"'}}'\
        -s $URL
    sleep 1
done