import { Client } from "https://deno.land/x/postgres@v0.4.6/mod.ts";
// import { Client } from "https://deno.land/x/postgres/mod.ts";

import { DBInitializer } from './TestDb/testDbInitializer.ts';
import { TestDBCoordinator } from './CustomORM/dbCoordinator.ts';
import { People } from "./TestDb/people.ts";


function getClient(): Client {
  return new Client({
    user: "testDB",
    password: "testDB",
    database: "testDB",
    hostname: "localhost",
    port: 5432
  });
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