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
  pic: string
  tags?: string[]
}

export interface iMyExperiences {
  opened: number
  experiences: iExperience[]
}

export interface iExperience {
  name: string
  ratting: number
  location: iLocation
  pic: string
  tag: string
}