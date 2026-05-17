<template>
  <div class="about">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>关于本项目</span>
        </div>
      </template>
      
      <el-descriptions title="项目信息" :column="2" border>
        <el-descriptions-item label="项目名称">qiankun 微前端学习项目</el-descriptions-item>
        <el-descriptions-item label="版本">1.0.0</el-descriptions-item>
        <el-descriptions-item label="作者">学习者</el-descriptions-item>
        <el-descriptions-item label="创建时间">2024</el-descriptions-item>
        <el-descriptions-item label="描述" :span="2">
          这是一个用于学习 qiankun 微前端框架的示例项目，包含主应用和多个子应用。
        </el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <h4>技术栈</h4>
      <el-space wrap>
        <el-tag size="large">Vue 3</el-tag>
        <el-tag size="large" type="success">React 18</el-tag>
        <el-tag size="large" type="warning">qiankun</el-tag>
        <el-tag size="large" type="danger">Vite</el-tag>
        <el-tag size="large" type="info">Element Plus</el-tag>
      </el-space>
    </el-card>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

h4 {
  margin-bottom: 15px;
  color: #303133;
}
</style>
