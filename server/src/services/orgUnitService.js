import OrgUnit from '../models/organizationUnits';
import Ward from '../models/ward';
import SubCounty from '../models/subCounty';
import County from '../models/county';
import fs from 'fs';

const checkCountySubCountyWard = async (county, subCounty, ward) => {
  const locations = {};

  const countyExists = await County.findById(county);
  if (!countyExists) {
    const newCounty = await County.create({ name: county });
    locations.county = newCounty._id;
  } else {
    locations.county = countyExists._id;
  }

  const subCountyExists = await SubCounty.findById(subCounty);
  if (!subCountyExists) {
    const newSubCounty = await SubCounty.create({
      name: subCounty,
      county: locations.county,
    });
    locations.subCounty = newSubCounty._id;
  } else {
    locations.subCounty = subCountyExists._id;
  }

  const wardExists = await Ward.findById(ward);
  if (!wardExists) {
    const newWard = await Ward.create({
      name: ward,
      subCounty: locations.subCounty,
    });
    locations.ward = newWard._id;
  } else {
    locations.ward = wardExists._id;
  }

  return locations;
};

// create a function to create an organization unit and add the target to the ward, subcounty, county
export const createOrgUnit = async body => {
  try {
    const { name, target, pmtDataCollector, supervisor } = body;

    const { county, subCounty, ward } = await checkCountySubCountyWard(
      body.county,
      body.subCounty,
      body.ward
    );

    const newOrgUnit = await OrgUnit.create({
      name,
      target,
      pmtDataCollector,
      supervisor,
      county,
      subCounty,
      ward,
    });

    // add the target to the ward, subcounty, county
    await Ward.findByIdAndUpdate(ward, { $inc: { target } });
    await SubCounty.findByIdAndUpdate(subCounty, { $inc: { target } });
    await County.findByIdAndUpdate(county, { $inc: { target } });

    return newOrgUnit;
  } catch (error) {
    throw new Error(error);
  }
};

// create a function to update an organization unit and update the target of the ward, subcounty, county
export const updateOrgUnit = async (id, body) => {
  try {
    const { name, target, pmtDataCollector, supervisor } = body;

    const orgUnit = await OrgUnit.findById(id);

    const { county, subCounty, ward } = await checkCountySubCountyWard(
      body.county,
      body.subCounty,
      body.ward
    );

    // subtract the old target from the ward, subcounty, county
    await Ward.findByIdAndUpdate(ward, { $inc: { target: -orgUnit.target } });
    await SubCounty.findByIdAndUpdate(subCounty, {
      $inc: { target: -orgUnit.target },
    });
    await County.findByIdAndUpdate(county, {
      $inc: { target: -orgUnit.target },
    });

    // add the new target to the ward, subcounty, county
    await Ward.findByIdAndUpdate(ward, { $inc: { target } });
    await SubCounty.findByIdAndUpdate(subCounty, { $inc: { target } });
    await County.findByIdAndUpdate(county, { $inc: { target } });

    const updatedOrgUnit = await OrgUnit.findByIdAndUpdate(
      id,
      {
        name,
        target,
        pmtDataCollector,
        supervisor,
        county,
        subCounty,
        ward,
      },
      { new: true }
    );

    return updatedOrgUnit;
  } catch (error) {
    throw new Error(error);
  }
};

// create a function to delete an organization unit and subtract the target from the ward, subcounty, county
export const deleteOrgUnit = async id => {
  try {
    const orgUnit = await OrgUnit.findById(id);

    // subtract the target from the ward, subcounty, county
    await Ward.findByIdAndUpdate(orgUnit.ward, {
      $inc: { target: -orgUnit.target },
    });
    await SubCounty.findByIdAndUpdate(orgUnit.subCounty, {
      $inc: { target: -orgUnit.target },
    });
    await County.findByIdAndUpdate(orgUnit.county, {
      $inc: { target: -orgUnit.target },
    });

    const deletedOrgUnit = await OrgUnit.findByIdAndDelete(id);

    return deletedOrgUnit;
  } catch (error) {
    throw new Error(error);
  }
};

// create a function to get organization units, add optional filters by county, or search filter. Also populate the county, subcounty, ward
export const getAllOrgUnits = async query => {
  try {
    const { county, search } = query;

    let orgUnits;

    if (county) {
      orgUnits = await OrgUnit.find({ county })
        // select only name and target
        .populate('county', 'name target')
        .populate('subCounty', 'name target')
        .populate('ward', 'name target')
        .populate('pmtDataCollector', 'name')
        .populate('supervisor', 'name');
    } else if (search) {
      orgUnits = await OrgUnit.find({ name: { $regex: search, $options: 'i' } })
        .populate('county', 'name target')
        .populate('subCounty', 'name target')
        .populate('ward', 'name target')
        .populate('pmtDataCollector', 'name')
        .populate('supervisor', 'name');
    } else {
      orgUnits = await OrgUnit.find()
        .populate('county', 'name target')
        .populate('subCounty', 'name target')
        .populate('ward', 'name target')
        .populate('pmtDataCollector', 'name')
        .populate('supervisor', 'name');
    }

    return orgUnits;
  } catch (error) {
    throw new Error(error);
  }
};

// create a function to get an organization unit by id, and populate the county, subcounty, ward
export const getOrgUnitById = async id => {
  try {
    const orgUnit = await OrgUnit.findById(id)
      .populate('county')
      .populate('subCounty')
      .populate('ward');

    return orgUnit;
  } catch (error) {
    throw new Error(error);
  }
};

// create a function to import organization units from a csv file
export const importOrgUnits = async file => {
  try {
    const orgUnits = [];

    // read the csv file
    const csv = fs.readFileSync(file.path, 'utf8');

    // parse the csv file
    const parsedCsv = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    });

    // loop through the parsed csv file and create an organization unit for each row. skip an organization unit if it already exists
    for (const row of parsedCsv) {
      const {
        county,
        subCounty,
        ward,
        name,
        target,
        pmtDataCollector,
        supervisor,
      } = row;

      const {
        county: countyId,
        subCounty: subCountyId,
        ward: wardId,
      } = await checkCountySubCountyWard(county, subCounty, ward);

      // check if the organization unit already exists
      const orgUnit = await OrgUnit.findOne({
        name,
        county: countyId,
        subCounty: subCountyId,
        ward: wardId,
      });

      if (orgUnit) {
        continue;
      }

      const newOrgUnit = await OrgUnit.create({
        name,
        target,
        pmtDataCollector,
        supervisor,
        county: countyId,
        subCounty: subCountyId,
        ward: wardId,
      });

      orgUnits.push(newOrgUnit);
    }

    // delete the csv file
    fs.unlinkSync(file.path);

    return orgUnits;
  } catch (error) {
    throw new Error(error);
  }
};

// create a function to export organization units to a csv file
export const exportOrgUnits = async () => {
  try {
    const orgUnits = await OrgUnit.find()
      .populate('county')
      .populate('subCounty')
      .populate('ward');

    const fields = [
      'county',
      'subCounty',
      'ward',
      'name',
      'target',
      'pmtDataCollector',
      'supervisor',
    ];

    const opts = { fields };

    const csv = parse(orgUnits, opts);

    return csv;
  } catch (error) {
    throw new Error(error);
  }
};
