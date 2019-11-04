const readline = require("readline");
const FastPriorityQueue = require("fastpriorityqueue");

const { handleInput } = require("./parser.js");
const { match } = require("./matcher");


function main() {
  openFileStream();
}

function createQueue() {
  //all slots will be ordered by start from date when added to queue
  const dateComparator = (lhs, rhs) => lhs.from.getTime() < rhs.from.getTime();
  return new FastPriorityQueue(dateComparator);
}

function openFileStream() {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const timeSlots = createQueue();

  readlineInterface.on('line', line => {
    handleInput(timeSlots, line);
  }).on('close', () => {
    let matched = match(timeSlots);
    show(matched);
    process.exit(0);
  });
}

function show(matched) {
  for (let availability in matched) {
    console.log(`Availability with id ${availability} is matched with shifts: `);
    matched[availability].forEach(s => console.log(s));
    console.log('');
  }
}

if (require.main === module) {
  main();
}
