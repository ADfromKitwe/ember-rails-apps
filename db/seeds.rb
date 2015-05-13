# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
20.times do
  Project.create(
    title: Faker::Lorem.words.join(' '),
    price: Faker::Number.number(4),
    description: Faker::Lorem.words.join(' '),
    customer: Faker::Name.name,
    isComplete: [true, false].sample
  ) 
end

5.times do
  Review.create(
    review: Faker::Lorem.words.join(' '),
    reviewer: Faker::Name.name
  )
end