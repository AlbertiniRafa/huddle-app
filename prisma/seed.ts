import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample interests
  const interests = [
    { name: 'Tennis', category: 'racquet', tags: ['racquet', 'individual', 'court'] },
    { name: 'Football', category: 'team', tags: ['team', 'outdoor', 'ball'] },
    { name: 'Swimming', category: 'water', tags: ['water', 'individual', 'pool'] },
    { name: 'Basketball', category: 'team', tags: ['team', 'indoor', 'ball'] },
    { name: 'Running', category: 'individual', tags: ['individual', 'outdoor', 'cardio'] },
    { name: 'Cycling', category: 'individual', tags: ['individual', 'outdoor', 'bike'] },
    { name: 'Golf', category: 'individual', tags: ['individual', 'outdoor', 'precision'] },
    { name: 'Badminton', category: 'racquet', tags: ['racquet', 'indoor', 'shuttlecock'] },
    { name: 'Cricket', category: 'team', tags: ['team', 'outdoor', 'bat'] },
    { name: 'Rugby', category: 'team', tags: ['team', 'outdoor', 'contact'] },
    { name: 'Yoga', category: 'fitness', tags: ['fitness', 'flexibility', 'mindfulness'] },
    { name: 'Gym', category: 'fitness', tags: ['fitness', 'strength', 'indoor'] }
  ]

  for (const interest of interests) {
    await prisma.interest.upsert({
      where: { name: interest.name },
      update: {},
      create: interest
    })
  }

  // Create sample venues
  const venues = [
    {
      name: 'Wimbledon Tennis Club',
      type: 'club',
      latitude: 51.4347,
      longitude: -0.2144,
      address: 'Church Rd, Wimbledon, London SW19 5AE',
      sportsSupported: ['Tennis'],
      contactInfo: { phone: '020 8946 6131', website: 'wimbledon.com' }
    },
    {
      name: 'David Lloyd Club',
      type: 'club',
      latitude: 51.5074,
      longitude: -0.1278,
      address: 'Central London',
      sportsSupported: ['Swimming', 'Tennis', 'Gym'],
      contactInfo: { phone: '020 1234 5678', website: 'davidlloyd.co.uk' }
    },
    {
      name: 'Chelsea FC Academy',
      type: 'club',
      latitude: 51.4816,
      longitude: -0.1909,
      address: 'Stamford Bridge, London SW6 1HS',
      sportsSupported: ['Football'],
      contactInfo: { phone: '020 7565 2000', website: 'chelseafc.com' }
    }
  ]

  for (const venue of venues) {
    const existing = await prisma.venue.findFirst({
      where: { name: venue.name }
    })
    
    if (!existing) {
      await prisma.venue.create({
        data: venue
      })
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
