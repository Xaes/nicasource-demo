#!/bin/bash

scp -i dev-pem.pem -Cr .production.env "ubuntu@3.22.179.39:~/nicasource-demo/current/packages/backend/"
