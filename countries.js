import { countries } from './seed/data/countries.js';
import Country from './models/Country.js'

export default async () => {
    // transaction
    await Country.insertMany(countries)
}