#!/bin/bash

export GIT_DIFFS=$(git diff)

if $GIT_DIFF; then
  echo "have diffs"
else
  echo "no diffs"
fi