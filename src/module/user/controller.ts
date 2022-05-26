import { ApiError } from '../../errors/ApiError'
import { IUser } from '../../model/User'
import * as service from './service'
import User from '../../model/User'

export const create = async (req, res, next) => {
  const { email, password, firstName, lastName, middleName = "jamal", isInfected = false }: IUser = req.body
  try {
    const user: IUser = await service.create({ email, password, firstName, lastName, middleName, isInfected })
    res.send(user)
    req.body = user

  } catch (error) {
    if (error.code == 11000)
      next(ApiError.duplicatedError("duplicate"))
  } finally {
    next()
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const { token, user } = await service.login({ email, password })
    res.send(token)
    req.body = user
    next()
  } catch (error) {
    next(error)
  }



}


export const changeInfection = async (req, res) => {
  const userId = req.userId
  const change = await service.changeInfection(userId)
  res.send(change)

}

export const findById = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).lean()
  res.send(user)
  next()
}




