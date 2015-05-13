class Project < ActiveRecord::Base
  validates :title, presence: true
  validates :price, presence: true, numericality: true
  validates :description, presence: true
  validates :customer, presence: true
end
