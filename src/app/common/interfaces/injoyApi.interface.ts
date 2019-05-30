import { iLocation } from './location.interface';

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
  ratting: number
  location: iLocation
  address: string
  pic: string | Object
  pics: string[]
  comments: string[] 
  tags?: string[]
}

export interface iMyExperiences {
  opened: number
  experiences: iExperience[]
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