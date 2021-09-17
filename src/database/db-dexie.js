import Dexie from 'dexie'

const _context = new Dexie('cache-api');

// Declare tables, IDs and indexes
_context.version(1).stores({
  countries: '++'
});

export default _context

