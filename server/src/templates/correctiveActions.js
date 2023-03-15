const correctiveActions = [
  {
    correctiveAction: 'Alert/Assist storekeeper with creating a ledger',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction: 'Direct the storekeeper in updating the store ledger',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Discuss the correct record keeping procedures with storekeeper',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Direct the storekeeper to complete updated stock cards and ledger pages for these items',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      "Instruct storekeeper to separate insecticide that will expire during this spray campaign or prior to next year's campaign from the others and clearly mark them.",
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Discuss record keeping with storekeeper',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Immediately alert the Logistics Manager and District Coordinator that the balance in the store ledger book does not match the balance in the stock cards',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Immediately alert the Logistics Manager and District Coordinator that the balance in the stock cards is inconsistent with a stock count',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Immediately alert the Logistics Manager and District Coordinator that the Insecticide Reconciliation Form is not completed daily',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Immediately alert the Logistics Manager and District Coordinator',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Discuss used sachet/bottle collection and record keeping procedure with storekeeper',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Direct the storekeeper to use an N95 or equivalent mask and maintain a 2-meter personal distance',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Direct all personnel to wear masks, gloves, boots, and overalls when handling insecticides',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Direct warehouse team not to eat inside warehouse while IRS insecticides are in stock',
    responsible: 'EC Specialist and Supply chain coordinator',
  },
  {
    correctiveAction:
      'Check storekeeper training date. Direct storekeeper to read MSDS for the current insecticide(s) to memorize the symptoms of poisoning',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Inform logistics/central storage to replace missing items for this facility',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Inform logistics/central storage to replace missing items',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Provide information on nearest health facility to storekeeper',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Inform logistics/central storage that antidotes may be needed for the health facility',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Contact logistics to provide water basins for washing hands',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Obtain the Material Safety Data sheet for the current insecticide from the ECO and have it posted',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Inform logistics/central storage to provide thermometer',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Identify the source of the leak. Arrange for spill to be cleaned. Ensure that a labelled, covered harzadous waste container is available. Arrange to have pesticides repacked as necessary.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Discuss storage of pesticide and conaminated waste with the storekeeper.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Obtain pesticide labels and re-label boxes.',
    responsible: 'SCC/Supply Chain Coordinator',
  },
  {
    correctiveAction: 'Discuss FEFO pesticide distribution with storekeeper.',
    responsible: 'SCC/Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Contact logistics to arrange for disposal of expired pesticide.',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Contact logistics/central storage for barrels or containers for empty bottles and used masks. Clearly label the barrels or containers as contaminated waste. Include type of pesticide on label.',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction: 'Discuss stacking and/or packing with storekeeper.',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Contact logistics and operations to arrange for the disposal of old waste at the end of the campaign.',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Perform full Pre-contract vehicle inspection. Contact Logistics and notify of vehicle substitution, and of inspection results.**',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Alert Logistics for vehicle substitution. Provide the additional check for expiration date.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Instruct driver to renew license',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct driver to immediately renew and provide COMP insurance or TPO cover with PLL. Provide the additional check for expiration date.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Instruct driver to renew license',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct the driver to immediately renew license online and provide copy. Provide the additional check for expiration date.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Instruct driver to renew license',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction: 'Provide safety training for driver.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify driver and site supervisor of violation. Supervise correction of the problem',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction:
      'immediately remove all food products, animal feed, and consumer goods from all trucks transporting insecticide. Instruct driver and logistics personnel about prohibition.',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction:
      'Instruct driver to get PPE from stores. Driver should have a charged cellphone for emergencies.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      "Instruct the driver to wear the nose mask provided by VectorLink whenever he has someone traveling along in the driver's compartment.",
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Provide materials for securing and tying down insecticides in the vehicle.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct the driver to get a fire extinguisher from stores.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Arrange for vehicle to be fitted with seats and railings ASAP.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Contact Logistician to replace the missing items for the vehicle.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Contact Logistician to replace the missing items for the vehicle.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'If the vehicle is carrying more than half of its capacity, find another vehicle to transport some of the spray operators. Instruct the spray operators to be seated staggered in the vehicle, with the sprayer secured between their legs.',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction: 'Find alternate transportation for some operators.',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction:
      'Instruct driver to decontaminate the vehicle before next use.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Contact Logistics and ask them to provide a hand-washing station for this site.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct everyone at the operations site to ensure that they wash their hands with soap and water before they enter the site and as often as possible.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Advise team leaders that they must check daily on the health of each of their spray operators for these symptoms, and any others.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Ensure that team leaders have determined the need to refer sick operators to the nearest health clinic for evaluation, and that the site supervisor has completed an Incident Report Form, if symptoms are possibly work-related. Communicate to spray operator that they will continue to receive daily wages while out for work-related illness.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct personnel who are not wearing masks and maintaining 2-meter personal distancing to do so.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Advise all spray operators to eat breakfast and drink plenty of water before donning PPE.',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction:
      'Instruct the storekeeper to record serial numbers of all insecticides while before issuing them to the team leaders.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the team leaders to record serial numbers of all insecticides issued to spray operators.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the team leaders and spray operators that both should sign the daily team leader distribution form.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Advise all spray operators to be in full PPE before boarding truck.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Advise spray operators not to eat after donning PPE. Make note of spray team and suggest retraining.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ask the spray team supervisor to demonstrate the correct procedure for filling up sprayers for spray operations.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ask spray team supervisor to demonstrate correct procedure for filling up sprayers for spray operations.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ask the supervisors to ensure that teams are properly spaced and staggered in the vehicle before departure from the operations site.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Direct spray operator not to start spraying a home until all personal belongings, food items, animals and sick persons have been removed from the structure',
    responsible: 'SBCC Coordinator',
  },
  {
    correctiveAction:
      'Remind the spray operator to keep a 2-meter personal distance when interacting with the homeowner',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct the spray operator to wash hands with soap and water before assisting with household preparation.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to move and cover all furniture items that cannot be removed with a plastic sheet before spraying the structure',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to remove all items from the wall and ceiling',
    responsible: 'SBCC Coordinator',
  },
  {
    correctiveAction:
      'Ensure that stored food is removed before room is sprayed. If food cannot be removed, do not allow SO to spray room',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Stop spray operator immediately. Direct spray operator not to spray structures where people (sick, elderly, babies) cannot be moved',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Stop the spray operator from putting on the long gloves. Direct the spray operator to wash their hands first, then put the long gloves back on',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction: 'Direct SO to wear full PPE throughout spray operations.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Direct spray team supervisor to demonstrate the correct procedure for rinsing the bottle while preparing the sprayer',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator on how to fill the tank to the correct volume.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to properly mix insecticide before pressurizing sprayer.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct operator on\r\ncorrect procedure for preparing\r\nthe sprayer',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction: 'Direct SO to wear full PPE throughout spray operations.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator not to smoke or eat during the work day',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator not to drink during household preparation or spraying.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to move all immovable items to the center of the room and cover them.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to remove clothes, mosquito nets, posters/pictures on the wall before spraying',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction: 'Direct operator to immediately service leaking sprayer',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct operator to ensure that the tip of the nozzle is 45 cm away from the wall',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct operator to adjust the speed of spraying to cover 2 meters of vertical wall surface in 5 seconds. Help him/her with counting 5 seconds and estimating 2 meters.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct operator to ensure that there is a 5 cm overlap with each successive swath. Assist them in estimating 5 cm of swath."',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Discuss with spray operator the correct surfaces to spray',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Discuss with spray operator the areas that should not be sprayed',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Discuss with the spray operator the correct pressurization procedure for spraying homes',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to require the residents to remove all the household items that are stored within 3 meters of spray.',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator how to properly mark structures',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to instruct resident on re-entry requirements',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to instruct resident to keep all animals outside the structure for 2.5 hours afterwards',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to ask resident to sweep up mosquitoes other bugs killed by IRS and deposit them in the latrine pit and not to allow children or animals inside until this has been completed',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction: 'Inform resident of post- spray protocol',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Direct spray operator to instruct resident on what to do if they suspect exposure to the insecticide',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Discuss with the spray operator the correct way to collect and record data and the mistakes that he/she might have made',
    responsible: 'MEL',
  },
  {
    correctiveAction:
      'Flag the spray operator(s) to the supervisor and insist the all spray operators continue to wear PPE on the way back to the\r\noperations site.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct site supervisor to ensure that no eating or drinking takes place prior to removing PPE and washing',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Direct the team leaders to ensure that all sachets/bottles and serial numbers are reconciled before spray operators perform triple-rinsing and/or PPE cleaning',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct the Team leaders to supervise all cleaning and wash-up',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction:
      'Notify site supervisor to provide soap and water for the wash facilities for operators',
    responsible: 'County Coordinator',
  },
  {
    correctiveAction:
      'Instruct site supervisor to ensure that all people (spray operators, washers, maintenance techs) in the wash/soak pit area wear full PPE',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ensure that all personnel at the operations site are wearing a mask and maintaining 2-meter personal distancing',
    responsible: 'DCOP VC',
  },
  {
    correctiveAction:
      'Instruct SO and supervisor to file accident form immediately',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to ensure that all SOs complete the daily report forms',
    responsible: 'MEL',
  },
  {
    correctiveAction: 'Instruct supervisor to check all daily forms',
    responsible: 'MEL',
  },
  {
    correctiveAction: 'Instruct supervisor to sync data to the server',
    responsible: 'MEL',
  },
  {
    correctiveAction: 'Instruct teal leader to summarize the data',
    responsible: 'MEL',
  },
  {
    correctiveAction:
      'Flag this compliance issue with the site supervisor and check to see if the storekeeper is keeping records of insecticides handed out and returned',
    responsible: 'Supply Chain Coordinator',
  },
  {
    correctiveAction:
      'Notify site supervisor to ensure that the wash area is sloped to the soak pit, and covered with a tarpaulin to catch all effluent',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct team leaders to be sure that sufficient water is available for triple rinse',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify site supervisor, retrain spray operators and team leaders',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify site supervisor, retrain spray operators and team leaders',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to demonstrate correct triple-rinse procedure',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to demonstrate correct washing procedure',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ask spray supervisor to demonstrate correct rinsing procedure',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to ensure that operators wash their face and hands with soap and water.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct workers to put on their face masks and maintain 2-meter personal distancing after washing face and hands',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify Site Coordinator and instruct to retrain all site staff in contaminated waste disposal',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Reshape soak pit slope or use tarpaulin to ensure proper drainage',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Soak pit may need rebuilding to remove mud and dirt, boot wash may be needed, or consider relocating soak pit',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Direct operator to ensure that there is a 5 cm overlap with each successive swath. Assist them in estimating 5 cm of swath."',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to ensure that spray operators store the sprayers in an orderly manner',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to ensure that covers are placed on all the triple-rinse drums after all sprayers are cleaned',
    responsible: 'EC Specialist',
  },
  {
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Discuss the location of the MSP wash area with the team leader. Notify the ECO',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Flag this compliance issue with the team leader, district coordinator, and operations manager',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct the site supervisor to ensure that waste water from the collection barrel is distributed among the sprayers at the end of the day',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify site supervisor to ensure that the wash area is sloped to the mobile soak pit, and covered with a tarpaulin to catch all effluent',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct team leaders to be sure that sufficient water is available for triple rinse',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify site supervisor, retrain spray operators and team leaders',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct team leaders and spray operators on correct sprayer rinsing technique',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to demonstrate correct triple-rinse procedure',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to demonstrate correct washing procedure',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to distribute the waste water from the collection drum into the sprayers',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ask spray supervisor to demonstrate correct rinsing procedure',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to ensure that operators wash their face and hands with soap and water',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct workers to put on their face masks and maintain 2-meter personal distancing after washing face and hands.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Notify Site Coordinator and instruct to retrain all site staff in contaminated waste disposal',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Reshape the slope of the wash area to ensure proper drainage',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Mobile soak pit may need to be relocated, or boot wash may be needed. Remind Team Leader to cover mobile soak pit hole when not in use so that rain does not saturate the ground',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct spray supervisor to ensure that covers are placed on all the triple-rinse drums after all sprayers are cleaned',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct the Team Leader and Site Supervisor to arrange for the 4 barrels and tarpaulin to be removed, hole for the MSP filled, and the ground returned to its original state',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ensure a lid is placed on the MSP, tarpaulin has been folded and removed for safe storage and the hole secured with a basin like cover.',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Discuss alternative storage of the MSP with the Site Supervisor',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ensure that porters transport overalls to fixed soak pit for washing',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Ensure that porters bring sufficient clean overalls to the field spray team',
    responsible: 'EC Specialist',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure the wheels are well aligned before bicycle is approved.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure a brand new tube or one in good condition is fitted before the start of the campaign.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure all tyres are in good condition.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure that the bicycle saddle is cushioned.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure the bicycle carrier is firmly mounted and fastened with nuts.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure that the rear and front breaks are functioning properly.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to ensure the bell is functioning well and guide him/her to mount at the right location.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to collect wooden cage for the pump from the storekeeper',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to line wooden cage with sponge and cover it with a polythene sheet',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator, to properly check the tubes and tyres for any sharp object before departure to the field.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction: 'Instruct SOP to grease the chain',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct spray operator to acquire all items required, before departure to field.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to fasten a wooden cage to the carrier.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to fasten the sprayer on the carrier using an elastic rubber rope.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to install a rubber pedal. Spray operator should not be allowed to proceed to field before this is fixed.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the spray operator to depressurize the pump and ensure the lid is tightly secured with or without insecticide content inside before fastening it on the carrier.',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct spray operator to have full PPE before depature to field',
    responsible: 'Sub County Coordinator',
  },
  {
    correctiveAction:
      'Instruct the team leader to collect the spill response kite from the storerooms.',
    responsible: 'Sub County Coordinator',
  },
];

const matchCorrectiveAction = correctiveAction => {
  const match = correctiveActions.find(action => {
    return action?.correctiveAction?.includes(correctiveAction);
  });

  return match;
};

export default matchCorrectiveAction;
