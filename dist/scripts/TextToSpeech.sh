#!/usr/bin/env bash

set -e

MESSAGE=""
OUTPUT_PATH=""

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -Message) MESSAGE="$2"; shift ;;
        -OutputPath) OUTPUT_PATH="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$MESSAGE" ] || [ -z "$OUTPUT_PATH" ]; then
    echo "Error: -Message and -OutputPath are required."
    exit 1
fi

OUTPUT_DIR=$(dirname "$OUTPUT_PATH")
mkdir -p "$OUTPUT_DIR"

if command -v espeak-ng &> /dev/null; then
    ESPEAK_BIN="espeak-ng"
elif command -v espeak &> /dev/null; then
    ESPEAK_BIN="espeak"
else
    echo "Error: Neither 'espeak' nor 'espeak-ng' is installed on this system." >&2
    exit 1
fi

"$ESPEAK_BIN" -w "$OUTPUT_PATH" "$MESSAGE"