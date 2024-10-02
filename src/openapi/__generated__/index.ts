/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignUpInput {
  /** 登陆账号 */
  username: string
  /** 登陆密码 */
  password1: string
  /** 确认密码 */
  password2: string
}

export interface SignInInput {
  /** 登录账号 */
  username: string
  /** 登录密码 */
  password: string
}

export interface SignInOutput {
  /** 访问令牌 */
  accessToken: string
  /** 刷新令牌 */
  refreshToken: string
}

export interface RefreshTokenInput {
  /** 刷新令牌 */
  refreshToken: string
}

export interface RefreshTokenOutput {
  /** 访问令牌 */
  accessToken: string
  /** 刷新令牌 */
  refreshToken: string
}

export interface AdministratorMenu {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 菜单名称 */
  name: string
  /** 菜单路径 */
  path: string
  /** 菜单图标 */
  icon?: string | null
  /** 父级ID */
  parentId?: string | null
  /** 父级菜单 */
  parent?: AdministratorMenu | null
  /** 页面文件 */
  component?: string
  /** 菜单顺序 */
  sort?: number
  /** 外部链接 */
  link?: string
  /** 权限标识 */
  acls?: string
  /** 翻译标识 */
  stem?: string
  /** 隐藏菜单 */
  hideInMenu?: boolean
  /** 是否内嵌 */
  embed?: boolean
  /** 是否缓存 */
  cache?: boolean
}

export interface AdministratorButton {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 按钮名称 */
  name: string
  /** 按钮代码 */
  code: string
  /** 菜单ID */
  menuId: string
  /** 所属菜单 */
  menu: AdministratorMenu
}

export interface AdministratorRole {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 角色名称 */
  name: string
  /** 角色代码 */
  code: string
  /** 菜单ID列表 */
  menuIDs: string[]
  /** 菜单列表 */
  menus: AdministratorMenu[]
  /** 按钮ID列表 */
  buttonIDs: string[]
  /** 按钮列表 */
  buttons: AdministratorButton[]
}

export interface LanguageLocale {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 语言名称 */
  name: string
  /** 语言代码 */
  code: string
  /** 语言图标 */
  icon?: string | null
  /** 语言排序 */
  sort?: number | null
}

export interface UserInfoOutput {
  /** 登陆账号 */
  username: string
  /** 用户昵称 */
  nickname?: string
  /** 用户头像 */
  avatar?: string
  /** 用户角色 */
  role?: AdministratorRole
  /** 用户语言 */
  locale?: LanguageLocale
}

export interface UserPasswordInput {
  /** 原始密码 */
  password: string
  /** 新的密码 */
  password1: string
  /** 确认密码 */
  password2: string
}

export interface UploadFileInput {
  /** 文件hash */
  hash: string
  /** 文件类型 */
  type: string
  /** 文件目录 */
  dest: string
  /** 文件索引 */
  index: number
  /** 文件总数 */
  total: number
}

export interface CreateMenuInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 菜单名称 */
  name: string
  /** 菜单路径 */
  path: string
  /** 菜单图标 */
  icon?: string | null
  /** 父级ID */
  parentId?: string | null
  /** 页面文件 */
  component?: string
  /** 菜单顺序 */
  sort?: number
  /** 外部链接 */
  link?: string
  /** 权限标识 */
  acls?: string
  /** 翻译标识 */
  stem?: string
  /** 隐藏菜单 */
  hideInMenu?: boolean
  /** 是否内嵌 */
  embed?: boolean
  /** 缓存页面 */
  cache?: boolean
}

export interface SearchMenuInput {
  /** 当前页码 */
  pageNo?: number
  /** 每页条数 */
  pageSize?: number
  /** 状态: 0启用, 1禁用 */
  status?: number[]
  /** 是否删除 */
  deleted?: boolean
  /** 菜单名称 */
  name?: string
  /** 菜单路径 */
  path?: string
}

export interface SearchMenuOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 菜单名称 */
  name: string
  /** 菜单路径 */
  path: string
  /** 菜单图标 */
  icon?: string | null
  /** 父级ID */
  parentId?: string | null
  /** 父级菜单 */
  parent?: AdministratorMenu | null
  /** 页面文件 */
  component?: string
  /** 菜单顺序 */
  sort?: number
  /** 外部链接 */
  link?: string
  /** 权限标识 */
  acls?: string
  /** 翻译标识 */
  stem?: string
  /** 隐藏菜单 */
  hideInMenu?: boolean
  /** 是否内嵌 */
  embed?: boolean
  /** 是否缓存 */
  cache?: boolean
}

export interface DetailMenuOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 菜单名称 */
  name: string
  /** 菜单路径 */
  path: string
  /** 菜单图标 */
  icon?: string | null
  /** 父级ID */
  parentId?: string | null
  /** 父级菜单 */
  parent?: AdministratorMenu | null
  /** 页面文件 */
  component?: string
  /** 菜单顺序 */
  sort?: number
  /** 外部链接 */
  link?: string
  /** 权限标识 */
  acls?: string
  /** 翻译标识 */
  stem?: string
  /** 隐藏菜单 */
  hideInMenu?: boolean
  /** 是否内嵌 */
  embed?: boolean
  /** 是否缓存 */
  cache?: boolean
}

export interface UpdateMenuInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 菜单名称 */
  name?: string
  /** 菜单路径 */
  path?: string
  /** 菜单图标 */
  icon?: string | null
  /** 父级ID */
  parentId?: string | null
  /** 页面文件 */
  component?: string
  /** 菜单顺序 */
  sort?: number
  /** 外部链接 */
  link?: string
  /** 权限标识 */
  acls?: string
  /** 翻译标识 */
  stem?: string
  /** 隐藏菜单 */
  hideInMenu?: boolean
  /** 是否内嵌 */
  embed?: boolean
  /** 缓存页面 */
  cache?: boolean
}

export interface CreateButtonInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 按钮名称 */
  name: string
  /** 按钮代码 */
  code: string
  /** 菜单ID */
  menuId: string
}

export interface SearchButtonInput {
  /** 当前页码 */
  pageNo?: number
  /** 每页条数 */
  pageSize?: number
  /** 状态: 0启用, 1禁用 */
  status?: number[]
  /** 是否删除 */
  deleted?: boolean
  /** 按钮名称 */
  name?: string
  /** 按钮代码 */
  code?: string
  /** 菜单ID */
  menuId?: string
}

export interface SearchButtonOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 按钮名称 */
  name: string
  /** 按钮代码 */
  code: string
  /** 菜单ID */
  menuId: string
  /** 所属菜单 */
  menu: AdministratorMenu
}

export interface DetailButtonOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 按钮名称 */
  name: string
  /** 按钮代码 */
  code: string
  /** 菜单ID */
  menuId: string
  /** 所属菜单 */
  menu: AdministratorMenu
}

export interface UpdateButtonInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 按钮名称 */
  name?: string
  /** 按钮代码 */
  code?: string
  /** 菜单ID */
  menuId?: string
}

export interface CreateRoleInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 角色名称 */
  name: string
  /** 角色代码 */
  code: string
  /** 角色菜单 */
  menuIDs?: string[]
  /** 角色按钮 */
  buttonIDs?: string[]
}

export interface SearchRoleInput {
  /** 当前页码 */
  pageNo?: number
  /** 每页条数 */
  pageSize?: number
  /** 状态: 0启用, 1禁用 */
  status?: number[]
  /** 是否删除 */
  deleted?: boolean
  /** 角色名称 */
  name?: string
  /** 角色代码 */
  code?: string
}

export interface SearchRoleOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 角色名称 */
  name: string
  /** 角色代码 */
  code: string
  /** 菜单ID列表 */
  menuIDs: string[]
  /** 菜单列表 */
  menus: AdministratorMenu[]
  /** 按钮ID列表 */
  buttonIDs: string[]
  /** 按钮列表 */
  buttons: AdministratorButton[]
}

export interface DetailRoleOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 角色名称 */
  name: string
  /** 角色代码 */
  code: string
  /** 菜单ID列表 */
  menuIDs: string[]
  /** 菜单列表 */
  menus: AdministratorMenu[]
  /** 按钮ID列表 */
  buttonIDs: string[]
  /** 按钮列表 */
  buttons: AdministratorButton[]
}

export interface UpdateRoleInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 角色名称 */
  name?: string
  /** 角色代码 */
  code?: string
  /** 角色菜单 */
  menuIDs?: string[]
  /** 角色按钮 */
  buttonIDs?: string[]
}

export interface CreateUserInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 登陆账号 */
  username: string
  /** 登陆密码 */
  password1: string
  /** 确认密码 */
  password2: string
  /** 用户昵称 */
  nickname?: string
  /** 联系方式 */
  phone?: string
  /** 邮箱地址 */
  email?: string
  /** 用户头像 */
  avatar?: string
  /** 备注信息 */
  remark?: string
  /** 用户角色 */
  roleId?: string | null
}

export interface SearchUserInput {
  /** 当前页码 */
  pageNo?: number
  /** 每页条数 */
  pageSize?: number
  /** 状态: 0启用, 1禁用 */
  status?: number[]
  /** 是否删除 */
  deleted?: boolean
  /** 登录账号 */
  username?: string
  /** 用户昵称 */
  nickname?: string
  /** 联系方式 */
  phone?: string
  /** 邮箱地址 */
  email?: string
}

export interface SearchUserOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 登录账号 */
  username: string
  /** 登录密码 */
  password: string
  /** 用户昵称 */
  nickname?: string
  /** 联系方式 */
  phone?: string
  /** 邮箱地址 */
  email?: string
  /** 用户头像 */
  avatar?: string
  /** 备注信息 */
  remark?: string
  /** 角色ID */
  roleID?: string
  /** 用户角色 */
  role?: AdministratorRole
}

export interface DetailUserOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 登录账号 */
  username: string
  /** 登录密码 */
  password: string
  /** 用户昵称 */
  nickname?: string
  /** 联系方式 */
  phone?: string
  /** 邮箱地址 */
  email?: string
  /** 用户头像 */
  avatar?: string
  /** 备注信息 */
  remark?: string
  /** 角色ID */
  roleID?: string
  /** 用户角色 */
  role?: AdministratorRole
}

export interface UpdateUserInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 登陆账号 */
  username?: string
  /** 用户昵称 */
  nickname?: string
  /** 联系方式 */
  phone?: string
  /** 邮箱地址 */
  email?: string
  /** 用户头像 */
  avatar?: string
  /** 备注信息 */
  remark?: string
  /** 用户角色 */
  roleId?: string | null
}

export interface PasswordUserInput {
  /** 登陆密码 */
  password1: string
  /** 确认密码 */
  password2: string
  /** 用户id */
  id: string
}

export interface CreateLocaleInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 语言名称 */
  name: string
  /** 语言代码 */
  code: string
  /** 语言图标 */
  icon?: string | null
  /** 语言排序 */
  sort?: number | null
}

export interface SearchLocaleInput {
  /** 当前页码 */
  pageNo?: number
  /** 每页条数 */
  pageSize?: number
  /** 状态: 0启用, 1禁用 */
  status?: number[]
  /** 是否删除 */
  deleted?: boolean
  /** 语言名称 */
  name?: string
  /** 语言代码 */
  code?: string
}

export interface SearchLocaleOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 语言名称 */
  name: string
  /** 语言代码 */
  code: string
  /** 语言图标 */
  icon?: string | null
  /** 语言排序 */
  sort?: number | null
}

export interface DetailLocaleOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 语言名称 */
  name: string
  /** 语言代码 */
  code: string
  /** 语言图标 */
  icon?: string | null
  /** 语言排序 */
  sort?: number | null
}

export interface UpdateLocaleInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 语言名称 */
  name?: string
  /** 语言代码 */
  code?: string
  /** 语言图标 */
  icon?: string | null
  /** 语言排序 */
  sort?: number | null
}

export interface CreateTranslationInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 翻译标识 */
  stem: string
  /** 翻译内容 */
  text: string
  /** 语言ID */
  localeId: string
}

export interface SearchTranslationInput {
  /** 当前页码 */
  pageNo?: number
  /** 每页条数 */
  pageSize?: number
  /** 状态: 0启用, 1禁用 */
  status?: number[]
  /** 是否删除 */
  deleted?: boolean
  /** 翻译标识 */
  stem?: string
  /** 翻译内容 */
  text?: string
  /** 语言ID */
  localeId?: string
}

export interface SearchTranslationOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 翻译标识 */
  stem: string
  /** 翻译内容 */
  text: string
  /** 语言ID */
  localeId: string
  /** 所属语言 */
  locale: LanguageLocale
}

export interface DetailTranslationOutput {
  /** 实体ID */
  id: string
  /** 实体状态: 0启用, 1禁用 */
  status: number
  /** 是否删除 */
  deleted: boolean
  /**
   * 创建时间
   * @format date-time
   */
  createAt: string
  /**
   * 更新时间
   * @format date-time
   */
  updateAt: string
  /** 翻译标识 */
  stem: string
  /** 翻译内容 */
  text: string
  /** 语言ID */
  localeId: string
  /** 所属语言 */
  locale: LanguageLocale
}

export interface UpdateTranslationInput {
  /** 状态: 0启用, 1禁用 */
  status?: number
  /** 翻译标识 */
  stem?: string
  /** 翻译内容 */
  text?: string
  /** 语言ID */
  localeId?: string
}
