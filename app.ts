import { DBInitializer } from './TestDb/testDbInitializer.ts';
import { TestDBCoordinator } from './CustomORM/dbCoordinator.ts';
import { People } from "./TestDb/people.ts";
import { DBClient, PostgresDBClient } from "./CustomORM/dbClient.ts";
import { ClientOptions } from "./CustomORM/clientOption.ts";


function getClient(): DBClient {
  const options = new ClientOptions();
  options.user = "testDB";
  options.password = "testDB";
  options.database = "testDB";
  options.hostname = "localhost";
  options.port = 5432;

  return new PostgresDBClient(options);
}

async function main() {
  const client = getClient();
  const dbInitializer = new DBInitializer(client);

  await dbInitializer.initDBIfNotExitst();

  const testDBCoordinator = TestDBCoordinator.CreateFromClient(TestDBCoordinator, client);

  // let result = await testDBCoordinator.people.execute();

  // let result = await testDBCoordinator.people.filter<People>((p => p.id > 2))
  //                                            .execute();

  try {
    let result = await testDBCoordinator.people.filter<People>(filterFunction)
                                             .execute();  
  } catch (error) {
    let result2 = await testDBCoordinator.people.filter<People>(filterFunction2)
                                             .execute();
  }

  try {
    
  } catch (error) {
    
  }
  
  // console.log('result ', result);
}

const filterFunction = (people: People) : boolean => {
  return people.id > 2
}

function filterFunction2(people: People) {
  return people.id > 2
}

main();