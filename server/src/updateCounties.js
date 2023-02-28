import reports from './models/reports';
import counties from './models/county';
import subCounties from './models/subCounty';
import wards from './models/ward';
import organizationUnits from './models/organizationUnits';

export const updateCounties = async () => {
  try {
    const report = await reports.find({});
console.log(report);
    //   the county, subcounty, ward and facility are currently stored as strings
    //   we need to update them to be objectIds so that we can use them to populate the reports
    //   we will use the name of the county, subcounty, ward and facility to get the objectIds
    //   and then update the reports
    //   we will also update the organizationUnits collection to have the same objectIds

    report.forEach(async report => {
      // check if the county, subcounty, ward and facility are objectIds
      // if they are, then skip

      // if (report.county instanceof ObjectId) return;
      console.log(report);

      const facility = await organizationUnits.findById(report.facility);
      console.log(facility);

      report.county = facility.county;
      report.subCounty = facility.subCounty;
      report.ward = facility.ward;

      await report.save();
    });
  } catch (err) {
    throw new Error(err);
  }
};
