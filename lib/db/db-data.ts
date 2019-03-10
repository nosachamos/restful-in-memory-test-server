
/** In-memory database data */
export interface InMemoryDb {
  [collectionName: string]: any[];
}

export class Db {
  static data = getDbData();
}

export function getDbData() {

  const heroes: any[] = [
    {
      id: 11,
      name: 'Maxwell Smart',
      saying: 'Missed it by that much.'
    },
    {
      id: 12,
      name: 'Bullwinkle J. Moose',
      saying: 'Watch me pull a rabbit out of a hat.'
    },
    {
      id: 13,
      name: 'Muhammad Ali',
      saying: 'Float like a butterfly, sting like a bee.'
    },
    {
      id: 14,
      name: 'Eleanor Roosevelt',
      saying: 'No one can make you feel inferior without your consent.'
    }
  ];

  const customers: any[] = [
    {
      id: 301,
      name: 'Maxwell Smart',
      saying: 'Missed it by that much.'
    },
    {
      id: 302,
      name: 'Bullwinkle J. Moose',
      saying: 'Watch me pull a rabbit out of a hat.'
    },
    {
      id: 303,
      name: 'Muhammad Ali',
      saying: 'Float like a butterfly, sting like a bee.'
    },
    {
      id: 304,
      name: 'Eleanor Roosevelt',
      saying: 'No one can make you feel inferior without your consent.'
    }
  ];

  const objects: any[] = [
    {
      id: 501,
      name: 'Maxwell Smart',
      objects: []
    },
    {
      id: 502,
      name: 'Bullwinkle J. Moose',
      objects: [
        {
          id: 521,
          name: 'Maxwell Smart'
        },
        {
          id: 522,
          name: 'Bullwinkle J. Moose'
        }
      ]
    },
    {
      id: 503,
      name: 'Muhammad Ali',
      objects: [
        {
          id: 541,
          name: 'Maxwell Smart'
        },
        {
          id: 542,
          name: 'Bullwinkle J. Moose'
        },
        {
          id: 543,
          name: 'Bullwinkle J. Moose 2'
        },
        {
          id: 544,
          name: 'Bullwinkle J. Moose 3'
        },
      ]
    },
    {
      id: 504,
      name: 'Eleanor Roosevelt',
      objects: [
        {
          id: 564,
          name: 'Bullwinkle J. Moose 5'
        }
      ]
    }
  ];

  const projects: any[] = [
    {
      id: 401,
      name: 'Maxwell Smart',
      saying: 'Missed it by that much.'
    },
    {
      id: 402,
      name: 'Bullwinkle J. Moose',
      saying: 'Watch me pull a rabbit out of a hat.'
    },
    {
      id: 403,
      name: 'Muhammad Ali',
      saying: 'Float like a butterfly, sting like a bee.'
    },
    {
      id: 404,
      name: 'Eleanor Roosevelt',
      saying: 'No one can make you feel inferior without your consent.'
    }
  ];

  const villains: any[] = [
    {
      id: 21,
      name: 'Dr. Evil',
      saying: 'One million dollars!'
    },
    {
      id: 22,
      name: 'Agent Smith',
      saying: 'Human beings are a disease.'
    },
    {
      id: 23,
      name: 'Natasha Fatale',
      saying: 'You can say that again, dahling.'
    },
    {
      id: 24,
      name: 'Goldfinger',
      saying: 'No, I expect you to die!'
    },
    {
      id: 25,
      name: 'West Witch',
      saying: `I'll get you, my pretty, and your little dog too!`
    },
    {
      id: 26,
      name: 'Tony Montana',
      saying: 'Say hello to my little friend.'
    }
  ];

  return { heroes, customers, villains, projects, objects } as InMemoryDb;
}
