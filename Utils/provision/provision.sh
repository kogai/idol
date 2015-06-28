#!/bin/bash
sudo apt-get update
sudo apt-get -y install ruby2.0
sudo gem install itamae
sudo itamae local /vagrant/Utils/provision/recipe.rb --log-level=debug
