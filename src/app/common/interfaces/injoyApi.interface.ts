import { iLocation } from './location.interface';

export interface iUser {
  user: string
  email: string
}

export interface iMylist {
  myList: iRoleList[]
  myExperiences: iMyExperiences
}

export interface iRoleList {
  title: string
  roles: iRole[]
}

export interface iRole {
  name: string
  ratting: { rattings: number, average: number }
  location: iLocation
  address: string
  pic: string | Object
  pics: string[]
  comments: string[] 
  tags?: string[]
}

export interface iMyExperiences {
  achievements: iAchievement[]
  experiences: iExperience[]
}

export interface iAchievement {
  title: string
  value?: number
}

export interface iExperience {
  user: string
  name: string
  ratting: number
  location: iLocation
  date: Date
  pic: string | Object
  tag: string
  comment: string
}