start-server:
	cd server && npm start 
start-client:
	cd client && npm run dev
build:
	docker-compose up -d --build