<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <template #header>
            <span>qiankun 微前端学习项目</span>
          </template>
          
          <h4>什么是微前端？</h4>
          <p>微前端是一种将前端应用分解成更小、更简单的部分的架构风格，这些部分可以独立开发、测试和部署。</p>
          
          <el-divider />
          
          <h4>项目架构</h4>
          <el-timeline>
            <el-timeline-item color="#409eff">
              <h5>主应用 (main-app) - 端口 5173</h5>
              <p>基座应用，负责注册和管理子应用，提供统一布局</p>
              <el-space>
                <el-tag>Vue 3</el-tag>
                <el-tag type="success">Element Plus</el-tag>
                <el-tag type="warning">qiankun</el-tag>
              </el-space>
            </el-timeline-item>
            <el-timeline-item color="#67c23a">
              <h5>Vue 子应用 (sub-app-vue) - 端口 8081</h5>
              <p>独立的 Vue 3 应用，可单独运行和部署</p>
            </el-timeline-item>
            <el-timeline-item color="#e6a23c">
              <h5>React 子应用 (sub-app-react) - 端口 8082</h5>
              <p>独立的 React 18 应用，展示技术栈无关性</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>技术栈</span>
          </template>
          <el-space wrap>
            <el-tag size="large">Vue 3</el-tag>
            <el-tag size="large" type="success">React 18</el-tag>
            <el-tag size="large" type="warning">qiankun</el-tag>
            <el-tag size="large" type="danger">Vite 5</el-tag>
            <el-tag size="large" type="info">Element Plus</el-tag>
            <el-tag size="large">Vue Router</el-tag>
          </el-space>
        </el-card>

        <el-card style="margin-top: 20px;">
          <template #header>
            <span>核心概念</span>
          </template>
          <ul class="concept-list">
            <li><strong>主应用</strong>：注册和管理子应用</li>
            <li><strong>子应用</strong>：独立的前端应用</li>
            <li><strong>生命周期</strong>：bootstrap、mount、unmount</li>
            <li><strong>沙箱隔离</strong>：JS 和样式隔离</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home h4 {
  margin: 0 0 10px;
  color: #303133;
}

.home h5 {
  margin: 0 0 5px;
  color: #409eff;
}

.home p {
  color: #606266;
  line-height: 1.6;
  margin: 0 0 10px;
}

.concept-list {
  padding-left: 20px;
  color: #606266;
}

.concept-list li {
  margin: 10px 0;
  line-height: 1.6;
}
</style>
