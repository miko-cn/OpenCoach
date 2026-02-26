#!/bin/bash
# 部署 ClawCoach 到 OpenClaw

set -e

echo "📦 部署 ClawCoach 到 OpenClaw..."

OPENCLAW_SKILL="$HOME/.openclaw/workspace/skills/opencoach-src"
OPENCLAW_AGENT="$HOME/.openclaw/workspace/agents/coach"
OPENCLAW_SKILL_LINK="opencoach"
OPENCLAW_AGENT_LINK="coach"

# 检查是否已存在
if [ -d "$OPENCLAW_SKILL" ]; then
    echo "⚠️  检测到已存在的部署"
    echo "   位置：$OPENCLAW_SKILL"
    echo ""
    echo "请选择："
    echo "  1. 更新现有部署 (git pull)"
    echo "  2. 重新部署 (删除后重新 clone)"
    echo "  3. 取消"
    echo ""
    read -p "输入选项 (1/2/3): " choice
    
    case $choice in
        1)
            echo "🔄 更新现有部署..."
            cd "$OPENCLAW_SKILL"
            git pull origin feature/openclaw-skill
            echo "✅ 更新完成！"
            exit 0
            ;;
        2)
            echo "🗑️  删除现有部署..."
            rm -rf "$OPENCLAW_SKILL"
            ;;
        3)
            echo "❌ 取消部署"
            exit 0
            ;;
        *)
            echo "❌ 无效选项"
            exit 1
            ;;
    esac
fi

# Clone 分支
echo "📥 Clone feature/openclaw-skill 分支..."
cd ~/.openclaw/workspace/skills
git clone -b feature/openclaw-skill git@github.com:miko-cn/OpenCoach.git opencoach-src

# 创建 symlink
echo "🔗 创建 symlink..."
ln -s opencoach-src/openClaw/skill $OPENCLAW_SKILL_LINK
ln -s opencoach-src/openClaw/agentConfig ../../agents/$OPENCLAW_AGENT_LINK

# 验证
echo ""
echo "✅ 部署完成！"
echo ""
echo "部署位置："
echo "  Skill:   $OPENCLAW_SKILL"
echo "  Agent:   $OPENCLAW_AGENT"
echo ""
echo "使用方式："
echo "  /coach goal \"我的目标\""
echo "  /coach task \"目标名称\""
echo "  /coach review \"上周\""
echo ""
echo "更新 Skill："
echo "  cd $OPENCLAW_SKILL && git pull"
