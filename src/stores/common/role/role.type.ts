export type RoleList = {
  id: 0
  name: string
  code: string
  roleExplain: string
  menus: RoleMenu[]
}

export type RoleMenu = {
  id: number
  siteType: string
  name: string
  route: string
  parentId: null
  displayOrder: number
}

export type RoleSearch = {
  nameRole: string
  codeRole: string
}
