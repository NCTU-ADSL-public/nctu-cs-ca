export BABEL_DISABLE_CACHE=1
sudo git clone -b danny https://github.com/NCTU-ADSL-public/nctu-cs-ca.git
sudo rm -rf src
sudo rm -rf public
sudo mv ./nctu-cs-ca/ca/src ./src
sudo mv ./nctu-cs-ca/ca/public ./public
sudo rm -rf nctu-cs-ca
sudo pkill node
sudo npm run build
sudo chmod 777 build/bundle.js
 npm run dev

