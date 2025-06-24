#!/bin/bash
cd /home/kavia/workspace/code-generation/birthdayfest-videomaker-70065-9a5eb735/birthday_video_frontend_workspace/birthday_video_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

