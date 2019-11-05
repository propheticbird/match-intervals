const { TimeIdentifier } = require("./model.js");

function match(timeSlots) {
  let availabilities = [];
  let matched = [];

  while (!timeSlots.isEmpty()) {
    let slot = timeSlots.poll();

    switch (slot.type) {
      
      case TimeIdentifier.SHIFT:
        matchAvailabilities(availabilities, slot, matched);
        break;

      case TimeIdentifier.AVAILABILITY:

        //check if queue window got too large and reset it 
        if (availabilities.length > 0 && isDataOneDayOld(availabilities, slot)) {
          availabilities.length = 0;
        }

        availabilities.push(slot);
        break;

      default:
        throw new Error('Unknown type of time slot.');
    }
  }

  return matched;
}

function matchAvailabilities(availabilities, shift, matched) {
  availabilities.forEach((availability) => {
    if (shift.from >= availability.from && availability.to >= shift.to) {
      if (matched.hasOwnProperty(availability.id)) {
        matched[availability.id].push(shift.id);
      } else {
        matched[availability.id] = [shift.id];
      }
    }
  });
}

const isDataOneDayOld = (cur, arr) => (cur.from.getTime() - arr[arr.length - 1].from.getTime()) / (1000 * 3600 * 24) > 1;

module.exports.match = match;
module.exports = isDataOneDayOld;