const host = window.location.host
const website = `${host}.admin.`

const Keys = {
  accessToken: `${website}accessToken`,
  refreshToken: `${website}refreshToken`,
  setting: `${website}setting`
}

export const getToken = () => {
  return {
    accessToken: localStorage.getItem(Keys.accessToken),
    refreshToken: localStorage.getItem(Keys.refreshToken)
  }
}

export const setToken = (data: {
  accessToken: string
  refreshToken: string
}) => {
  localStorage.setItem(Keys.accessToken, data.accessToken)
  localStorage.setItem(Keys.refreshToken, data.refreshToken)
}

export const removeToken = () => {
  localStorage.removeItem(Keys.accessToken)
  localStorage.removeItem(Keys.refreshToken)
}

type Setting = {
  settingVisible?: boolean
  asideCollapse?: boolean
  asideVisible?: boolean
  asideWidth?: number
  animate?: string
  language?: string
  color?: string
  dark?: string
  weak?: boolean
  gray?: boolean
}

export const getSetting = <K extends keyof Setting>(
  key: K
): Setting[K] | undefined => {
  let setting: Setting = {}
  try {
    const stored = localStorage.getItem(Keys.setting)
    if (stored) {
      setting = JSON.parse(stored)
    }
    return setting[key]
  } catch {
    return setting[key]
  }
}

export const setSetting = <K extends keyof Setting>(
  key: K,
  value: Setting[K]
) => {
  let setting: Setting = {}
  try {
    const stored = localStorage.getItem(Keys.setting)
    if (stored) {
      setting = JSON.parse(stored)
    }
  } finally {
    setting[key] = value
    localStorage.setItem(Keys.setting, JSON.stringify(setting))
  }
}
