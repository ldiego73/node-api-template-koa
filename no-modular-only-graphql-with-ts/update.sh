#!/bin/sh

# Install package upadte
npm i -g npm-check-updates

# Validate packages versions
ncu -u

# Delete files
rm -rf node_modules/
rm -rf yarn.lock
rm -rf package-lock.json

# Install packages
npm install
