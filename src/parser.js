const { TimeSlot } = require("./model.js");

function handleInput(timeSlots, line) {
    const slot = parseLine(line);
    timeSlots.add(new TimeSlot(slot.type, slot.id, slot.from, slot.to));
}

const parseLine = (line) => {
    const exp = /^(?<type>Shift|Availability) (?<id>[0-9a-zA-Z]+): (?<from>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) - (?<to>\d{4}-\d{2}-\d{2} \d{2}:\d{2})$/;
    let found = line.match(exp);

    if (found === null) {
        throw new Error("Time slot string is mailformed.")
    }

    return found.groups;
}

module.exports.handleInput = handleInput;