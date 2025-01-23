import moment from "moment"

export const formatTimestamp = (timestamp) => {  
  const milliseconds = timestamp.seconds * 1000
  return moment(milliseconds).format("DD-MM-YYYY HH:mm")
}
