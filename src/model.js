const TimeIdentifier = Object.freeze({
  SHIFT: "Shift",
  AVAILABILITY: "Availability",
});

class TimeSlot {
  constructor(type, id, from, to) {
    this.type = type;
    this.id = id;
    this.from = new Date(from);
    this.to = new Date(to);
  }
}

module.exports.TimeIdentifier = TimeIdentifier;
module.exports.TimeSlot = TimeSlot;