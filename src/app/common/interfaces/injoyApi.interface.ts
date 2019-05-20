import { iLocation } from './location.interface';

export interface iMylist {
  myList: iRoleList[]
  myExperiences: iMyExperiences
}

export interface iRoleList {
  title: string
  roles: iRole[]
}

export interface iMyExperiences {
  opened: number
  roles: iRole[]
}

export interface iRole {
  name: string
  ratting: number
  location: iLocation
  pic: string
}