#!/bin/bash

scp -i dev-pem.pem -Cr .env "ubuntu@3.22.179.39:~/nicasource-demo/current/packages/backend/"
