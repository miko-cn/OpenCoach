#!/usr/bin/env node
/**
 * ClawCoach Skill 测试脚本
 * 
 * 测试所有 Phase 1 命令
 */

const { execCLI, formatSuccess, formatError } = require('./utils');

console.log('🧪 ClawCoach Skill 测试\n');
console.log('=' .repeat(50));

// 测试 1: list 命令（空列表）
console.log('\n📋 测试 1: list 命令');
const listResult = execCLI('goals list');
console.log(listResult.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', listResult.output);

// 测试 2: goal 命令（创建目标）
console.log('\n🎯 测试 2: goal 命令');
const goalResult = execCLI('goals create "测试目标-Skill 测试"');
console.log(goalResult.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', goalResult.output);

// 测试 3: list 命令（应该有 1 个目标）
console.log('\n📋 测试 3: list 命令（验证创建）');
const listResult2 = execCLI('goals list');
console.log(listResult2.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', listResult2.output);

// 测试 4: task 命令
console.log('\n✅ 测试 4: task 命令');
const taskResult = execCLI('tasks create "测试目标-Skill 测试"');
console.log(taskResult.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', taskResult.output);

// 测试 5: review 命令
console.log('\n🔄 测试 5: review 命令');
const reviewResult = execCLI('reviews create "测试目标-Skill 测试"');
console.log(reviewResult.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', reviewResult.output);

// 测试 6: state 命令
console.log('\n📊 测试 6: state 命令');
const stateResult = execCLI('state set create-goal TEST_STATE');
console.log(stateResult.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', stateResult.output);

// 测试 7: data 命令
console.log('\n💾 测试 7: data 命令');
const dataResult = execCLI('data set --key test_key --value "test_value"');
console.log(dataResult.success ? '✅ PASS' : '❌ FAIL');
console.log('   输出:', dataResult.output);

console.log('\n' + '='.repeat(50));
console.log('\n✅ 所有 CLI 测试完成！\n');
