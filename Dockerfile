FROM public.ecr.aws/lambda/nodejs:12

ARG DIR="/var/task"

COPY . $DIR

RUN mkdir -p $DIR

RUN npm install

CMD [ "index.handler"]