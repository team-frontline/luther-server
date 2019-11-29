#!/bin/bash

export GIT_DIFFS=$(git status)

if $GIT_DIFF; then
  echo "have diffs"
else
  echo "no diffs"
fi