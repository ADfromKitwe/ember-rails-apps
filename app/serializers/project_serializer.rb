class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :description, :customer, :isComplete
  # might need embed for the typeError
  embed :id
end
