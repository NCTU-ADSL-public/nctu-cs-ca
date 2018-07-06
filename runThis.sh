sudo git clone -b FrontEnd https://github.com/NCTU-ADSL-public/nctu-cs-ca.git
#sudo netstat -plnt | grep 1111 | awk '{print $7}' | tr -d ‘/node’ | xargs sudo kill -9
#sudo pkill node
sudo rm -rf ./src
sudo rm -rf ./public
sudo mv ./nctu-cs-ca/ca/src/ ./src/
sudo mv ./nctu-cs-ca/ca/public/ ./public
sudo rm -rf nctu-cs-ca
#sudo netstat -plnt | grep 1111 | awk '{print $7}' | tr -d ‘/node’ | xargs sudo kill -9
#sudo pkill node
sudo npm run prod 
