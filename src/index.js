const readline = require("readline");
const { TimeIdentifier, TimeSlot } = require("./model.js");

function main() {
  openFileStream();
}

const shifts = [];
let availabilities = [];

function openFileStream() {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  readlineInterface.on('line', line => {
    handleInput(line);
  }).on('close', () => {
    processAvailability();
    process.exit(0);
  });
}

function handleInput(line) {
  const slot = parseSlot(line);

  switch (slot.type) {
    case TimeIdentifier.SHIFT:
      shifts.push(new TimeSlot(slot.type, slot.id, slot.from, slot.to));
      break;

    case TimeIdentifier.AVAILABILITY:
      availabilities.push(new TimeSlot(slot.type, slot.id, slot.from, slot.to));
      break;

    default:
      throw new Error('Unknown type of time slot.');
  }
}

function parseSlot(line) {
  const exp = /^(?<type>Shift|Availability) (?<id>[0-9a-zA-Z]+): (?<from>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) - (?<to>\d{4}-\d{2}-\d{2} \d{2}:\d{2})$/;
  let found = line.match(exp);

  if (found === null) {
    throw new Error("Time slot string is mailformed.")
  }

  return found.groups;
}

function processAvailability() {
  for (const availability of availabilities) {
    let intervals = findCommonIntervals(shifts, availability);

    if (intervals.length > 0) {
      console.log('Shifts that match slot with id ' + availability.id + ':');
      intervals.forEach(interval => console.log(interval));
      console.log('');
    }
  }
}

function findCommonIntervals(shifts, availableSlot) {
  let matched = [];

  for (const shift of shifts) {

    if (shift.from >= availableSlot.from && availableSlot.to >= shift.to) {
      matched.push(shift.id);
    }
  }

  return matched;
}

if (require.main === module) {
  main();
}
