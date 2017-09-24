sudo git clone -b danny https://github.com/NCTU-ADSL-public/nctu-cs-ca.git
sudo rm -rf src
sudo rm -rf public
sudo mv ./nctu-cs-ca/ca/src ./src
sudo mv ./nctu-cs-ca/ca/public ./public
sudo rm -rf nctu-cs-ca
sudo npm run dev
