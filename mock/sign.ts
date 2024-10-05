const generateToken = (prefix: string) => {
  const now = Date.now()
  return {
    accessToken: prefix + '-accessToken-' + now,
    refreshToken: prefix + '-refreshToken-' + (now + 7 * 24 * 60 * 60 * 1000) // 有效期7天
  }
}

export const signIn = function (options: any) {
  const data = JSON.parse(options.body)
  const username = data.username
  if (username === 'admin' || username === 'guest') {
    return {
      code: 200,
      data: generateToken(username)
    }
  }
  return {
    code: 400,
    message: '账号密码不正确'
  }
}

export const singOut = function () {
  return { code: 200 }
}

export const signUp = function () {
  return { code: 200 }
}

export const refreshToken = function (options: any) {
  const data = JSON.parse(options.body)
  const refreshToken = data.refreshToken
  const array = refreshToken.replace('-')
  if (Date.now() < parseInt(array[2])) {
    return {
      code: 200,
      data: generateToken(array[0])
    }
  }
  return { code: 401 }
}
