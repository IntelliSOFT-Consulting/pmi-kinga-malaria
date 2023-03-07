import Report from '../models/reports';
import organizationUnits from '../models/organizationUnits';
import County from '../models/county';
import telerivet from '../config/telerivet';
import * as templates from '../templates/pmt';
import { format } from 'date-fns';
import * as methods from '../lib/utils';

// save sms report to db
export const createReport = async body => {
  const { content, secret, contact } = body;
  const { phone_number } = contact;

  if (secret === process.env.TR_SECRET && content?.includes('A.')) {
    const data = content.split('.');
    const totalSop = data[1];
    const totalStructures = data[2];
    const sprayedStructures = data[3];
    const sachets = data[4];
    const facility = data[5];
    const date = data[6] ? new Date(data[6]) : new Date();
    const test_yn = data[7] ? 'no' : 'yes';

    const location = await organizationUnits
      .findOne({
        facility,
      })
      .select('county subCounty ward')
      .lean();

    const report = new Report({
      user: phone_number,
      totalSop,
      totalStructures,
      sprayedStructures,
      sachets,
      facility,
      county: location.county,
      subCounty: location.subCounty,
      ward: location.ward,
      date,
      test_yn,
    });

    await report.save();
    await telerivet.sendMessage(
      {
        content: `The report for ${facility} has been submitted successfully.`,
        to_number: phone_number,
      },
      function (err, message) {
        if (err) {
          throw new Error(err);
        }
        console.log(message);
      }
    );

    return report;
  } else {
    throw new Error('invalid secret');
  }
};

export const getReports = async (isTest, startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date();

  const allReports = await Report.find({ test_yn: isTest })
    .populate('ward', 'name target')
    .populate('subCounty', 'name target')
    .populate('county', 'name target')
    .populate('facility', 'name target');

  const datedReports = await Report.find({
    date: { $gte: start, $lte: end },
    test_yn: isTest,
  })
    .populate('ward', 'name target')
    .populate('subCounty', 'name target')
    .populate('county', 'name target')
    .populate('facility', 'name target');

  const totalCounntiesTarget = await County.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$target' },
      },
    },
  ]);

  const indicator = await smsReport(datedReports);
  const countryReport = await country(
    datedReports,
    totalCounntiesTarget[0]?.total
  );
  const countryCummulative = await country(
    allReports,
    totalCounntiesTarget[0]?.total
  );
  const countyReport = await county(datedReports);
  const countyCummulative = await county(allReports);
  const subCountyReport = await subCounty(datedReports);
  const subCountyCummulative = await subCounty(allReports);
  const wardReport = await ward(datedReports);
  const wardCummulative = await ward(allReports);

  const datas = [
    {
      sheet: 'SMS Indicator Report',
      columns: templates.smsIndicator,
      content: indicator,
    },
    {
      sheet: 'Country',
      columns: templates.country,
      content: countryReport,
    },
    {
      sheet: 'Cummulative (Country)',
      columns: templates.country,
      content: countryCummulative,
    },
    {
      sheet: 'County',
      columns: templates.county,
      content: countyReport,
    },
    {
      sheet: 'Cummulative (County)',
      columns: templates.county,
      content: countyCummulative,
    },
    {
      sheet: 'Sub-County',
      columns: templates.subCounty,
      content: subCountyReport,
    },
    {
      sheet: 'Cummulative (Sub-County)',
      columns: templates.subCounty,
      content: subCountyCummulative,
    },
    {
      sheet: 'Ward',
      columns: templates.ward,
      content: wardReport,
    },
    {
      sheet: 'Cummulative (Ward)',
      columns: templates.ward,
      content: wardCummulative,
    },
  ];

  return datas;
};

const smsReport = reports => {
  try {
    return reports.map(report => {
      const {
        county,
        subCounty,
        ward,
        facility,
        sachets,
        sprayedStructures,
        totalStructures,
        totalSop,
        date,
      } = report;


      return {
        'Entered date': date
          ? format(new Date(date), 'PPP')
          : format(new Date(report.createdAt), 'PPP'),
        'Date and time submitted': format(
          new Date(report.createdAt),
          'yyyy-MM-dd hh:mm'
        ),
        Country: 'Kenya',
        County: county?.name,
        'Sub County': subCounty?.name,
        Ward: ward?.name,
        'Operation Site': facility?.name,
        'Team Code': '',
        'SOPs Worked': totalSop,
        '# Structures Found': totalStructures,
        '# Structures Sprayed': sprayedStructures,
        '# Insecticide Used': sachets,
        '# Structures per SOP': methods.getAverage(totalStructures, totalSop),
        '# Structures per IU': methods.getAverage(sprayedStructures, sachets),
        'Spray coverage': `${methods.percentage(
          sprayedStructures,
          totalStructures
        )} (${sprayedStructures}/${totalStructures})`,
      };
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const country = (report, target) => {
  try {
    const totalStructures = methods.getTotalOf(report, 'totalStructures');
    const totalSprayedStructures = methods.getTotalOf(
      report,
      'sprayedStructures'
    );
    const totalSop = methods.getTotalOf(report, 'totalSop');
    const totalSachets = methods.getTotalOf(report, 'sachets');
    const structuresPerSop = methods.getAverage(totalStructures, totalSop);
    const structuresPerIU = methods.getAverage(
      totalSprayedStructures,
      totalSachets
    );

    const cummulativeCoverage = methods.getCummulative(
      totalSprayedStructures,
      totalStructures
    );

    const cummulativeProgress = methods.getCummulative(
      totalSprayedStructures,
      target
    );

    return [
      {
        Country: 'Kenya',
        'SOPs Worked': totalSop,
        '# Structures Found': totalStructures,
        '# Structures Sprayed': totalSprayedStructures,
        '# Insecticide Used': totalSachets,
        '# Structures per SOP': structuresPerSop,
        '# Structures per IU': structuresPerIU,
        'Cumulative Spray Coverage': cummulativeCoverage,
        Target: target,
        'Cumulative Spray Progress': cummulativeProgress,
      },
    ];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const county = reports => {
  const counties = methods.uniqueLocations(reports, 'county');
  return counties.map(report => {
    const countyReports = methods.getLocationReport(reports, 'county', report);
    const totalSprayedStructures = methods.getTotalOf(
      countyReports,
      'sprayedStructures'
    );
    const totalStructures = methods.getTotalOf(
      countyReports,
      'totalStructures'
    );
    const totalSop = methods.getTotalOf(countyReports, 'totalSop');
    const totalSachets = methods.getTotalOf(countyReports, 'sachets');
    const structuresPerSop = methods.getAverage(totalStructures, totalSop);
    const structuresPerIU = methods.getAverage(
      totalSprayedStructures,
      totalSachets
    );

    const target = reports.find(item => item.county.name === report)?.county
      ?.target;

    const cumulativeSprayCoverage = methods.getCummulative(
      totalSprayedStructures,
      totalStructures
    );

    const cumulativeSprayProgress = methods.getCummulative(
      totalSprayedStructures,
      target
    );

    try {
      return {
        Country: 'Kenya',
        County: report,
        'SOPs Worked': totalSop,
        '# Structures Found': totalStructures,
        '# Structures Sprayed': totalSprayedStructures,
        '# Insecticide Used': totalSachets,
        '# Structures per SOP': structuresPerSop,
        '# Structures per IU': structuresPerIU,
        'Cumulative Spray Coverage': cumulativeSprayCoverage,
        Target: target,
        'Cumulative Spray Progress': cumulativeSprayProgress,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

const subCounty = reports => {
  const subCounties = methods.uniqueLocations(reports, 'subCounty');

  return subCounties.map(report => {
    const subCountyReports = methods.getLocationReport(
      reports,
      'subCounty',
      report
    );

    const totalSprayedStructures = methods.getTotalOf(
      subCountyReports,
      'sprayedStructures'
    );
    const totalStructures = methods.getTotalOf(
      subCountyReports,
      'totalStructures'
    );
    const totalSop = methods.getTotalOf(subCountyReports, 'totalSop');
    const totalSachets = methods.getTotalOf(subCountyReports, 'sachets');
    const structuresPerSop = methods.getAverage(totalStructures, totalSop);
    const structuresPerIU = methods.getAverage(
      totalSprayedStructures,
      totalSachets
    );

    const target = reports.find(item => item.subCounty.name === report)
      ?.subCounty?.target;

    const cummulativeCoverage = methods.getCummulative(
      totalStructures,
      totalSprayedStructures
    );

    const cummulativeProgress = methods.getCummulative(
      totalSprayedStructures,
      target
    );

    try {
      return {
        Country: 'Kenya',
        'Sub County': report,
        'SOPs Worked': totalSop,
        '# Structures Found': totalStructures,
        '# Structures Sprayed': totalSprayedStructures,
        '# Insecticide Used': totalSachets,
        '# Structures per SOP': structuresPerSop,
        '# Structures per IU': structuresPerIU,
        'Cumulative Spray Coverage': cummulativeCoverage,
        Target: target,
        'Cumulative Spray Progress': cummulativeProgress,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

const ward = reports => {
  try {
    const uniqueFacilities = methods.uniqueLocations(reports, 'facility');
    return uniqueFacilities.map(report => {
      const facilityReports = methods.getLocationReport(
        reports,
        'facility',
        report
      );
      const totalSprayedStructures = methods.getTotalOf(
        facilityReports,
        'sprayedStructures'
      );
      const totalStructures = methods.getTotalOf(
        facilityReports,
        'totalStructures'
      );
      const totalSop = methods.getTotalOf(facilityReports, 'totalSop');
      const totalSachets = methods.getTotalOf(facilityReports, 'sachets');
      const structuresPerSop = methods.getAverage(totalStructures, totalSop);
      const structuresPerIU = methods.getAverage(
        totalSprayedStructures,
        totalSachets
      );
      const facilityItem = reports.find(item => item.facility?.name === report);
      const target = facilityItem?.facility?.target;

      const sprayCoverage = methods.getCummulative(
        totalStructures,
        totalSprayedStructures
      );
      const sprayProgress = methods.getCummulative(
        totalSprayedStructures,
        target
      );

      return {
        Ward: facilityItem?.ward?.name,
        'Operations Site': report,
        'SOPs Worked': totalSop,
        '# Structures Found': totalStructures,
        '# Structures Sprayed': totalSprayedStructures,
        '# Insecticide Used': totalSachets,
        '# Structures per SOP': structuresPerSop,
        '# Structures per IU': structuresPerIU,
        'Cumulative Spray Coverage': sprayCoverage,
        Target: target,
        'Cumulative Spray Progress': sprayProgress,
      };
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const latePmtReport = async (
  reports,
  date = new Date(new Date().setHours(0, 0, 0, 0))
) => {
  const facilities = await organizationUnits
    .find({})
    .populate('supervisor', 'name phone')
    .populate('county', 'name')
    .populate('subCounty', 'name')
    .populate('ward', 'name');

  //  look for organizations which reports.facility.name is not in facilities.name
  const latePmtFacilities = facilities.filter(facility => {
    return !reports.some(report => report.facility.name === facility.name);
  });

  // get all the phone numbers of the supervisors of the late pmt facilities if they exist. Only return the phone numbers of the supervisors that exist
  const latePmtFacilitiesSupervisors = latePmtFacilities
    .map(facility => {
      if (facility.supervisor) {
        return facility.supervisor.phone;
      }
    })
    .filter(phone => phone);

  const message = `Hello, this is a reminder to submit your daily spray report for today. Thank you`;

  latePmtFacilitiesSupervisors.forEach(async phone => {
    await telerivet.sendMessage(
      {
        content: message,
        to_number: phone.phone_number,
      },
      function (err, message) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        console.log(message);
      }
    );
  });

  return latePmtFacilities?.map(facility => ({
    'Missing Report Date': format(new Date(date), 'yyyy-MM-dd'),
    Name: facility?.supervisor?.name,
    County: facility?.county?.name,
    'Sub-County': facility?.subCounty?.name,
    Ward: facility?.ward?.name,
    'Operations Site': facility?.name,
    'Submission Status': 'Incorrect or no PMT data submitted',
  }));
};
