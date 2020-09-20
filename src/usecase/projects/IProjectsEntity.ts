interface IProjectsEntity {
  _id: string
  site: string
  groups: IGroup[]
  lastSearch: string
}

export interface IGroup {
  id: string
  name: string
}

export default IProjectsEntity