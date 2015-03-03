#!bin/bash
rake build
jekyll build
cd _site/
python -m SimpleHTTPServer 5000
