export const role = {
  mage: '法师',
  fighter: '战士',
  tank: '坦克',
  assassin: '刺客',
  support: '辅助',
  marksman: '射手'
}

export function role_zh(r) {
  const res = []
  if (r) {
    const roles = r.replace('[', '').replace(']', '').replace(' ', '').split(',')
    for (const i in roles) {
      res.push(role[roles[i]])
    }
    return res
  }
}
