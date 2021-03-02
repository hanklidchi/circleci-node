const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost:7687',
  // 'neo4j://localhost',
  neo4j.auth.basic('neo4j', 'password'),
);
const session = driver.session();
const personName = 'Alice';

async function start() {
  try {
    const result = await session.run(
      'CREATE (a:Person {name: $name}) RETURN a',
      {
        name: personName,
      },
    );

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
}

start();

console.log('hello');
