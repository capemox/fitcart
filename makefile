server:
	@cd monolithic && python main.py

client:
	@cd frontend && npm start

build:
	@cd microservice/$(target) && docker build -t $(target)-microservice:v1 .
	@cd ~ && docker image save -o $(target)-microservice.tar $(target)-microservice:v1 && minikube image load $(target)-microservice.tar
	echo "built!"

reload:
	@cd ~ && kubectl delete deployment $(target) && kubectl delete service $(target)
	@cd microservice/$(target) && kubectl apply -f deployment.yaml && kubectl apply -f service.yaml
	echo "reloaded!"

load:
	@cd microservice/$(target) && kubectl apply -f deployment.yaml && kubectl apply -f service.yaml
	echo "loaded!"

build_reload:
	@cd microservice/$(target) && docker build -t $(target)-microservice:v1 .
	@cd ~ && docker image save -o $(target)-microservice.tar $(target)-microservice:v1 && minikube image load $(target)-microservice.tar
	echo "built!"
	@cd ~ && kubectl delete deployment $(target) && kubectl delete service $(target)
	@cd microservice/$(target) && kubectl apply -f deployment.yaml && kubectl apply -f service.yaml
	echo "reloaded!"

service:
	kubectl delete service api-gateway
	kubectl expose deployment api-gateway --type=LoadBalancer --port=8000
	echo "run minikube service api-gateway"
