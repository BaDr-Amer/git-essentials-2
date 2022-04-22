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
  let countryCheck, countryID;
  let cityCheck = [];
  let universityCheck = [];
  let index = 0;
  session.startTransaction();
  try {
    countryCheck = await Country.insertMany(
      continent.map(({ name }) => {
        return { name };
      })
    );

    if (!countryCheck)
      throw ApiError.badRequest("Error while adding countries");

    for await (let cont of continent) {
      countryID = countryCheck[index++]._id;

      for await (let city of cont.cities) {
        cityCheck.push({ name: city.name, country_id: countryID });
      }
      for await (let university of cont.universities) {
        universityCheck.push({ name: university.name, country_id: countryID });
      }
    }
    cityCheck = await City.insertMany(cityCheck);
    if (!cityCheck) throw ApiError.badRequest("Error while adding cities");


    universityCheck = await University.insertMany(universityCheck);
    if (!universityCheck)
      throw ApiError.badRequest("Error while adding universities");
    await session.commitTransaction();
    var endTime = performance.now();
    console.log(startTime - endTime);
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};
