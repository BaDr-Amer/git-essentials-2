import { countries } from './data/countriesAndCitiesAndUniversities.js';
import Country from '../models/Country.js'
import City from '../models/City.js'
import University from '../models/University.js'
import mongoose from 'mongoose';

export default async () => {
    let countryId;
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        for await (const country of countries) {
            countryId = mongoose.Types.ObjectId()
            new Country({ _id: countryId, name: country.name }).save(function (err, res) {
            }, { session })
            const countryCities = country.cities?.map(obj => ({ ...obj, countryId }))
            const countryUniversities = country.universities?.map(obj => ({ ...obj, countryId }))
            await City.insertMany(countryCities, { session })
            await University.insertMany(countryUniversities, { session })
        }
    })
    session.endSession()

}