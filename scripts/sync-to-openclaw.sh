#!/bin/bash
# 同步 main 分支到 OpenClaw 适配分支

set -e

echo "🔄 同步 main 分支到 feature/openclaw-skill..."

# 切换到 OpenClaw 分支
git checkout feature/openclaw-skill

# 拉取最新代码
git pull origin feature/openclaw-skill

# 合并 main
git merge main

# 检查是否有冲突
if [ $? -ne 0 ]; then
    echo "⚠️  检测到冲突，请手动解决后继续"
    echo "   git status 查看冲突文件"
    echo "   解决后执行：git add . && git commit && git push"
    exit 1
fi

# 推送更新
git push origin feature/openclaw-skill

echo "✅ 同步完成！"
echo ""
echo "更新 OpenClaw 部署："
echo "  cd ~/.openclaw/workspace/skills/opencoach-src"
echo "  git pull origin feature/openclaw-skill"
