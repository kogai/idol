# DB関連のインストール

package "mysql-server" do
  action :install
  not_if "which mysql"
end

service "mysql" do
  user "root"
  action :start
end


# サーバー関連のインストール

execute 'Install nvm' do
  user "root"
  command "curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash"
  not_if "which nvm"
end

execute 'wait for installing nvm' do
  command "wait"
end

# execute 'Install iojs' do
#   user "root"
#   command "nvm install iojs-v2.3.0 && nvm alias default iojs-v2.3.0"
# end

remote_file "/home/vagrant/.bash_profile" do
  owner "root"
  group "root"
  source ".bash_profile"
  only_if 'test -d /home/vagrant/'
  not_if 'test -e /home/vagrant/.bash_profile'
end

remote_file "/root/.bash_profile" do
  owner "root"
  group "root"
  source ".bash_profile"
  only_if 'test -d /root/'
  not_if 'test -e /root/.bash_profile'
end
