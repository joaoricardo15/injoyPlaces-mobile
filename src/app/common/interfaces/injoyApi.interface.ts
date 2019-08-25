export interface iUser {
  user: string
  email: string
}

export interface iMylist {
  roles: iRole[]
  myLists: iRoleList[]
}

export interface iRoleList {
  title: string,
  Icon: string,
  roles: number[]
}

export interface iRole {
  name: string
  ratting: { rattings: number, average: number }
  location: iLocation
  address: iAddress
  pic: string | Object
  pics: string[]
  comments: string[] 
  tags: string[]
  occasions: string[]
}

export interface iMyExperiences {
  achievements: iAchievement[]
  statistics: iExperience[]
  experiences: iExperience[]
}

export interface iAchievement {
  title: string
  subtitle: string
  img?: string
  icon?: string
  value?: number
  message: string
}

export interface iExperience {
  user: string
  name: string
  date: Date
  ratting: number
  location: iLocation
  address?: iAddress
  pic?: string | Object
  occasion?: string
  tag?: string
  comment?: string
}

export interface iLocation {
  lat: number
  lng: number
}

export interface iAddress {
  street: string
  number: string
  complement?: string
  suburb: string
  city: string
  state: string,
  country: string
}