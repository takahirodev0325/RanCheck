import httpClient from './httpClient'
import { URL, RANCHECK } from './HttpService'
import { HTTP_SUCCESS, HTTP_AUTHENTICATION_FAILED } from '../../config/code'
import { COMMON_ERROR } from '../../config/response'

export interface fetchType {
  title?: string
  url?: string
  result?: {
    date: string
    rank: string
  }[]
}[]

const rancheckDao = {
  isValidLicense: async (token: string): Promise<boolean> => {
    const params = {
      site: 'example.com',
      token
    }
    const { data } = await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.FETCH_RANK}`,
      params
    ).catch(() => COMMON_ERROR)
    return data.code !== HTTP_AUTHENTICATION_FAILED
  },

  register: async (token: string, site: string, keywords: string[]): Promise<boolean> => {
    const { data } = await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.REGISTER_KEYWORD}`,
      { token, site, keywords }
    ).catch(() => COMMON_ERROR)
    return data.code === HTTP_SUCCESS
  },

  deleteKeyword: async (token: string, site: string, keywords: string[]): Promise<boolean> => {
    const { data } = await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.DELETE_KEYWORD}`,
      { token, site, keywords }
    ).catch(() => COMMON_ERROR)
    return data.code === HTTP_SUCCESS
  },

  download: async (token: string, site: string): Promise<fetchType> => {
    const { data } = await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.FETCH_RANK}`,
      { site, token }
    ).catch(() => COMMON_ERROR)
    return data.body
  }
}

export default rancheckDao
