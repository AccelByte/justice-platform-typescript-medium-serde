# Copyright (c) 2020 AccelByte Inc. All Rights Reserved.
# This is licensed software from AccelByte Inc, for limitations
# and restrictions contact your company contract manager.

FROM node:14.7.0-alpine3.12
RUN apk update && apk add --no-cache --wait 10 bash git
