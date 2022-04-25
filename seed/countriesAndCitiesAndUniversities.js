import City from "../models/City.js";
import University from "../models/University.js";
import Country from "../models/Country.js";
import mongoose from "mongoose";
import { ApiError } from "../errors/ApiError.js";
import { continent } from "./data/countriesAndCitiesAndUniversities.js";
import fs from "fs/promises";
import { lookup } from "dns";
import Lookup from "../models/Lookup.js";

export default async () => {
  let session = await mongoose.startSession();
  var startTime = performance.now();
  let countryCheck
  let countryID
  let cityCheck = [];
  let universityCheck = [];
  let index = 0;
  session.startTransaction();
  try {
    let getCountriesNameFromJSON = continent.map((country) => {
      return country.name;
    });

    // getCountriesfromDatabase will find if there is a country in the database similer to the JSON File and put it in a Set
    let getCountriesfromDatabase = new Set(
      await (
        await Country.find({ name: { $in: getCountriesNameFromJSON } }, { name: 1 })
      ).map((continent) => {
        return continent.name;
      })
    );
    getCountriesNameFromJSON = getCountriesNameFromJSON
      .map((value) => {
        if (!getCountriesfromDatabase.has(value)) {
          return { name: value };
        }
      })
      .filter((value) => value != undefined);

    countryCheck = await Country.insertMany(getCountriesNameFromJSON, {
      session,
    });

    if (!countryCheck)
      throw ApiError.badRequest("Error while adding countries");

    for await (let cont of continent) {
      if (!getCountriesfromDatabase.has(cont.name)) {
        countryID = countryCheck[index++]._id;
        
        for await (let city of cont.cities) {
          cityCheck.push({ name: city.name, country_id: countryID });
        }
        for await (let university of cont.universities) {
          universityCheck.push({
            name: university.name,
            country_id: countryID,
          });
        }
      }
    }

    cityCheck = await City.insertMany(cityCheck, { session });
    if (!cityCheck) throw ApiError.badRequest("Error while adding cities");

    universityCheck = await University.insertMany(universityCheck, { session });
    if (!universityCheck)
      throw ApiError.badRequest("Error while adding universities");
    await session.commitTransaction();
    var endTime = performance.now();
    console.log(startTime - endTime);
    console.log(index)
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};
