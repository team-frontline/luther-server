#!/bin/bash

if git diff --name-only; then
  echo have diffs
else
  echo no diffs
fi