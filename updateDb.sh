sudo git clone https://github.com/karljackab/csca_db.git
sudo rm -rf db/msql.js
sudo rm -rf db/sqlString.js
sudo mv ./csca_db/src/msql.js ./db
sudo mv ./csca_db/src/sqlString.js ./db
sudo rm -rf csca_db
