#! /usr/bin/env bash

while [ : ]
do
    now=$(date +"%r")
    index=$(( ( RANDOM % 23 ) ))
    echo "POST to server with data $index at $now"
    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"index":'"$index"'}'\
        -s http://localhost:3001/note
    sleep 5
done