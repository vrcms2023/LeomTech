import moment from 'moment'
import { getBaseURL } from './ulrUtil'

export const generateOptionLength = (values) =>{
    return Array.from({length: values}, (_, i) => i + 1)
   }

export const showPosteddate = (dt) => {
    if(!dt) return 0
    const postD = moment(moment(dt).format('YYYY-MM-DD'))
    const currentD = moment()
    return currentD.diff(postD, 'days')
  }

export const getDateValue = (dt) => {
  return moment(dt).format('DD-MM-YYYY')
}

export const getImagePath = (path) => {
  const baseURL = getBaseURL();
  return `${baseURL}${path}`
}

