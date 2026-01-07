#!/bin/bash
cd /home/kavia/workspace/code-generation/flow-chemistry-learning-platform-1486-1495/flow_chemistry_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

