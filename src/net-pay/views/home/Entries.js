const axios = require ('axios')


const paginateEntries = async (Server, history, pageNumber) => {
  try {
    let authToken = localStorage.getItem (Server.storage.authToken)
    let result = await axios.post (`${ Server.url }/a/auth`, { authToken })
    if (!result.data.success) {
      return history.push ('/login')
    }

    authToken = result.data.authToken
    const mobileNumber = result.data.mobileNumber

    result = await axios.get (`${ Server.url }/t/${ authToken }/${ mobileNumber }/${ pageNumber || 1 }/5`)
    return result.data.entries

  } catch (ex) {
    console.error (ex.message || ex)
    history.push ('/500')
  }
}


module.exports = { paginateEntries }