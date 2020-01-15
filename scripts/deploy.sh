aws ecr get-login --no-include-email --region us-west-2 | /bin/bash
docker build -t wtq-node .
docker tag wtq-node:latest 287445272123.dkr.ecr.us-west-2.amazonaws.com/wtq-node:latest
docker push 287445272123.dkr.ecr.us-west-2.amazonaws.com/wtq-node:latest
