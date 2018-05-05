#!/bin/bash
docker pull dockerfile/mongodb
docker run -d -p 27017:27017 -v ~/data/db:/data/db --name mongodb dockerfile/mongodb