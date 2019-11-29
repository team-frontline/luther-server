#!/bin/bash

if ! `git status | grep -q "nothing to commit"`; then
  echo have diffs
else
  echo no diffs
fi