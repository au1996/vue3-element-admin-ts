#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 部署
git add .
git commit -m 'refactor: :arrow_up: Upgrade vite version to 3.x'
git push origin master
