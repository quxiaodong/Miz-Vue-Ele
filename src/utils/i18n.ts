import { createI18n } from 'vue-i18n'

const instance = createI18n({})

export default instance

export const i18n = instance.global

// 有些信息展示的时候，配置还没有加载
const initial = {
  en: {
    'common:locale.load-failed': 'Failed to load locale',
    'common:locale.load-translation': 'Translation is loading',
    'common.new-version-update': 'New version detected, update?',
    'common:api.unauthorized':
      'User information has expired, please log in again'
  },
  zhCn: {
    'common:locale.load-failed': '多语言配置加载失败',
    'common:locale.load-translation': '多语言配置加载中',
    'common.new-version-update': '检测到新版本，是否更新?',
    'common:api.unauthorized': '用户信息过期，请重新登录'
  }
}

// 通用配置
const setting = {
  en: {
    'common.please-input': 'Please input',
    'common.please-select': 'Please select',
    'common.please-confirm': 'Please confirm',
    'common.confirm-remove': 'Confirm Remove?',
    'common.tip': 'Tip',
    'common.confirm': 'Confirm',
    'common.reset': 'Reset',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.create': 'Create',
    'common.update': 'Update',
    'common.remove': 'Remove',
    'common.enable': 'Enable',
    'common.disable': 'Disable',
    'common.fold': 'Fold',
    'common.unfold': 'Unfold'
  },
  zhCn: {
    'common.please-input': '请输入',
    'common.please-select': '请选择',
    'common.please-confirm': '请确认',
    'common.confirm-remove': '确定删除吗？',
    'common.tip': '提示',
    'common.confirm': '确认',
    'common.reset': '重置',
    'common.submit': '提交',
    'common.cancel': '取消',
    'common.search': '搜索',
    'common.create': '新建',
    'common.update': '编辑',
    'common.remove': '删除',
    'common.enable': '启用',
    'common.disable': '禁用',
    'common.fold': '折叠',
    'common.unfold': '展开'
  }
}

// 通用布局
const layout = {
  en: {
    'common:layout.change-password': 'Change password',
    'common:layout.change-password.success': 'Change password success',
    'common:layout.current-password': 'Current password',
    'common:layout.new-password': 'New password',
    'common:layout.confirm-password': 'Confirm password',
    'common:layout.sign-out': 'Sign out',
    'common:layout.sign-out-success': 'Sign out success'
  },
  zhCn: {
    'common:layout.change-password': '修改密码',
    'common:layout.change-password.success': '修改密码成功',
    'common:layout.current-password': '当前密码',
    'common:layout.new-password': '新的密码',
    'common:layout.confirm-password': '确认密码',
    'common:layout.sign-out': '退出登录',
    'common:layout.sign-out-success': '退出登录成功'
  }
}

// 通用表格
const table = {
  en: {
    'common:table.no-column': 'No column',
    'common:table.stripe': 'Table Stripe',
    'common:table.stripe.open': 'Open',
    'common:table.stripe.close': 'Close',
    'common:table.refresh': 'Refresh',
    'common:table.size': 'Size',
    'common:table.size.small': 'Small',
    'common:table.size.default': 'Default',
    'common:table.size.large': 'Large',
    'common:table.setting': 'Setting',
    'common:table.setting.show-sort': 'Col Show/Sort',
    'common:table.fullscreen': 'Fullscreen'
  },
  zhCn: {
    'common:table.no-column': '暂无展示列',
    'common:table.stripe': '表格斑马纹',
    'common:table.stripe.open': '开',
    'common:table.stripe.close': '关',
    'common:table.refresh': '刷新',
    'common:table.size': '密度',
    'common:table.size.small': '紧凑',
    'common:table.size.default': '中等',
    'common:table.size.large': '宽松',
    'common:table.setting': '列设置',
    'common:table.setting.show-sort': '列显示/排序',
    'common:table.fullscreen': '全屏'
  }
}

// 表单验证
const validate = {
  en: {
    'common:validate.username-length':
      'Account length must be between {min} and {max}',
    'common:validate.username-regex':
      'Account must be composed of lowercase letters and numbers',
    'common:validate.password-length':
      'Password length must be between {min} and {max}',
    'common:validate.password-must-contain':
      'Password must contain numbers and letters',
    'common:validate.password-regex':
      'Password must be composed of uppercase and lowercase letters, numbers and special characters {characters}',
    'common:validate.password2-not-equal': 'The two passwords are inconsistent'
  },
  zhCn: {
    'common:validate.username-length': '账号长度必须在{min}到{max}之间',
    'common:validate.username-regex': '账号由小写英文字母和数字组成',
    'common:validate.password-length': '密码长度必须在{min}到{max}之间',
    'common:validate.password-must-contain': '密码必须包含数字和字母',
    'common:validate.password-regex':
      '密码必须由大小写字母，数字和特殊字符 {characters} 组成',
    'common:validate.password2-not-equal': '两次密码不一致'
  }
}

i18n.setLocaleMessage('en', {
  ...initial.en,
  ...setting.en,
  ...layout.en,
  ...table.en,
  ...validate.en,
  // 暗黑模式
  'common:mode.light': 'Light',
  'common:mode.dark': 'Dark',
  'common:mode.auto': 'Auto',
  // 菜单名称
  'common:menu.home': 'Home',
  'common:menu.sign-in': 'Sign in',
  'common:menu.sign-up': 'Sign up',
  // 404
  '/404.description': 'Sorry, the page you visited does not exist',
  '/404.back': 'Back to home',
  // sign-in
  '/sign-in.login': 'Login',
  '/sign-in.login-success': 'Login success',
  '/sign-in.to-register': "Haven't account? Go to register",
  // sign-up
  '/sign-up.register': 'Register',
  '/sign-up.register-success': 'Register success',
  '/sign-up.to-login': 'Have account? Go to login'
})

i18n.setLocaleMessage('zhCn', {
  ...initial.zhCn,
  ...setting.zhCn,
  ...layout.zhCn,
  ...table.zhCn,
  ...validate.zhCn,

  'common:mode.light': '明亮模式',
  'common:mode.dark': '暗黑模式',
  'common:mode.auto': '跟随系统',

  'common:menu.home': '首页',
  'common:menu.sign-in': '登录',
  'common:menu.sign-up': '注册',

  '/404.description': '抱歉，您访问的页面不存在',
  '/404.back': '返回首页',

  '/sign-in.login': '登录',
  '/sign-in.login-success': '登录成功',
  '/sign-in.to-register': '没有账号？去注册',

  '/sign-up.register': '注册',
  '/sign-up.register-success': '注册成功',
  '/sign-up.to-login': '已有账号？去登录'
})
