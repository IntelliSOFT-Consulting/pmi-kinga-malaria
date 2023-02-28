import County from '../models/county';
import SubCounty from '../models/subCounty';
import Ward from '../models/ward';
import orgUnit from '../models/organizationUnits';
import { addresses } from '../locations';

export const importLocations = async () => {
  try {
    const counties = await County.find();
    const subCounties = await SubCounty.find();
    const wards = await Ward.find();
    const orgUnits = await orgUnit.find();

    if (counties.length === 0) {
      const counties = addresses
        .filter(location => location.key === 'county')
        .map(location => ({ name: location.val }));

      await County.insertMany(counties);
    }

    if (subCounties.length === 0) {
      const savedCounties = await County.find();
      const subCounties = addresses
        .filter(location => location.key === 'sub_county')

        .map(location => {
          const county = savedCounties.find(
            county => county.name === location.val
          );
          return { name: location.val, county: county._id };
        });

      await SubCounty.insertMany(subCounties);
    }

    if (wards.length === 0) {
      const savedSubCounties = await SubCounty.find();
      const wards = addresses
        .filter(location => location.key === 'ward')
        .map(location => {
          const subCounty = savedSubCounties.find(
            subCounty => subCounty.name === location.val
          );
          return {
            name: location.val,
            subCounty: subCounty._id,
            county: subCounty.county,
          };
        });

      await Ward.insertMany(wards);
    }

    if (orgUnits.length === 0) {
      const savedWards = await Ward.find();
      const orgUnits = addresses
        .filter(location => location.key === 'operations_site')
        .map(location => {
          const ward = savedWards.find(ward => ward.name === location.val);
          return {
            name: location.val,
            ward: ward._id,
            subCounty: ward.subCounty,
            county: ward.county,
          };
        });

      await orgUnit.insertMany(orgUnits);
    }
  } catch (error) {
    console.log(error);
  }
};
