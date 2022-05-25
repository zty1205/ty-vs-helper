const COMMITIZEN = [
  'feat: 新增了一个功能',
  'fix: 修复了一个 bug',
  'docs: 更改文档',
  'style: 不影响代码含义的变化',
  'refactor: 代码重构',
  'perf: 改进性能的代码更改',
  'test: 添加确实测试或更正现有的测试',
  'build: 影响构建系统或外部依赖关系的更改',
  'ci: 更改持续集成文件和脚本',
  'chore: 其他不修改src或test文件',
  'revert: commit 回退'
];

const PATH_EXTS = ['.vue', '.js', 'jsx', '/index.vue', '/index.js', '/index.jsx', '.css', '/index.css'];

// vuex文件查找顺序
const STORE_FIND_PATH = ['./src/store/index', './src/store'];
const NAMESPACE_STORE_FIND_PATH = ['./src/store', './src/store/modules'];
// vuex文件默认刷新引用次数
const STORE_MAX_CACHE = 5;

module.exports = {
  COMMITIZEN,
  PATH_EXTS,
  STORE_FIND_PATH,
  NAMESPACE_STORE_FIND_PATH,
  STORE_MAX_CACHE
};
