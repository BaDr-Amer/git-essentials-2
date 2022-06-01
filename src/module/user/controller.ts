import { ApiError } from '../../errors/ApiError'
import { IUser } from '../../model/User'
import * as service from './service'
import User from '../../model/User'

export const create = async (req, res, next) => {
  const { email, password, firstName, lastName, middleName = "jamal", isInfected = false }: IUser = req.body
  const createdAt = req.date
  const updatedAt = req.date
  try {
    const user: IUser = await service.create({ email, password, firstName, lastName, middleName, isInfected, createdAt: createdAt, updatedAt: updatedAt })
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



export const updateMany = async (req, res, next) => {
  const { firstName, updatedFirstName } = req.body
  const { updatedAt } = req.date
  const update = await service.updateMany({ firstName, updatedFirstName, updatedAt: updatedAt })
  res.send(update)
  next()
}



export const deleteByFirstName = async (req, res, next) => {
  const { firstName } = req.body
  const del = await service.deleteByFirstName({ firstName })
  const findDate = await User.findOneWithDeleted({ firstName })
  req.date = findDate.deletedAt
  res.send(del)
  next()

}



