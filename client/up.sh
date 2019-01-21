sudo docker-compose down -v --rmi all
sudo docker-compose up --force-recreate --build -d
sudo docker rmi $(docker images --filter "dangling=true" -q --no-trunc)