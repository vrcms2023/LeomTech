import moment from 'moment'

export const generateOptionLength = (values) =>{
    return Array.from({length: values}, (_, i) => i + 1)
   }

export const showPosteddate = (postedDate) => {
    if(!postedDate) return 0
    const postD = moment(moment(postedDate).format('YYYY-MM-DD'))
    const currentD = moment()
    return currentD.diff(postD, 'days')
  }