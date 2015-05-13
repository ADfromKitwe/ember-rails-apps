class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :price
      t.text :description
      t.string :customer
      t.boolean :isComplete

      t.timestamps
    end
  end
end
