# Load Balancers

On the load balancers section, we create two different load balancers, one for the Front to manage the public routing and another one for the backend to manage the private request from the front end on different availability zones.

The process to create the two different Load balacers was the same, but it changes a little because the load balancer for the back is private back. 

**Note** using this schema it is neccessary for the Back load balancer to be deployed at first because the Front end is going to make the requests to this load balancer.


![image](https://user-images.githubusercontent.com/53226911/168496246-339b56d1-3894-4a47-b276-1aa145863a29.png)


## 1. Back Load balancer

### 1.1 Create the AMI for the back intance
On the EC2 intances list, select the intance where the back is deployed and click on 'Actions' -> 'Images and templates' and on this screen it is necessary to create the AMi with the configuration on the guide.

### 1.2 Create a Target group
Create a target group with the configuration on the guide document

### 1.3 Create a Load Balancer

Create aLoad Balancer with the configuration of the guide but on Basic configuration change the option on scheme: from internet facing to internal

![image](https://user-images.githubusercontent.com/53226911/168496563-5f876e13-75cd-4d4b-8059-fed2d68ab4fb.png)

### 1.4 Create a Lauch template

Create the Launch template with the configuration from the guide document and select the Ami from the Back created on the numeral `1.1`.

### 1.5 Create the Auto Scaling group for the back

Create the autoScaling group for the back application with the same configuration on the document guide.

## 2. Front Load Balancer

### 2.1 Pre configuration on the Front End intance

On the Front End we decided to use a Reverse Proxy to create a route for `/api/books` because the request the FrontEnd makes is done on local to that path.

In order to do that, we decided to install nginx on the local machine
    
    sudo apt-get install nginx


We also had to change the execution port of the docker because before it was using the same port as nginx. in order to do that we modify the `docker-compose.yml` file with the following content 

    version: "3.2"
    services:
      front:
        image: front.image:latest
        build: ./
        ports:
        - 8000:80
        expose:
        - "80"
        restart: always
        environment:
            NODE_ENV: production
            PORT: 80
            HOST: 0.0.0.0

And, run the container

    sudo docker-compose up
   

We had to edit the file on `/etc/nginx/sites-available/default` for the nginx to bind the router `/api/books` from another location, and to redirect the traffic from the port 80 to the port 8000.

We added the following configuration.


    server {
            listen 80 default_server;
            listen [::]:80 default_server;

            root /var/www/html;

            index index.html index.htm index.nginx-debian.html;

            server_name _;

            location / {
                  proxy_pass http://localhost:8000;
                  #proxy_set_header Host $host;

                  proxy_set_header        Host $host:$server_port;
                  proxy_set_header        X-Real-IP $remote_addr;
                  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header        X-Forwarded-Proto $scheme;  
          }

          location /api/books {
                  proxy_pass http://internal-LB-BACK-207909715.us-east-1.elb.amazonaws.com/api/books;
          }

      }

**Note:** It is neccesarry to the load balancer of the back to be deployed at first because we need the DNS of this to paste on the nginx configuration.

**This is all the pre configuration we need for the Front end load balancer**


### 2.2 Create the AMI for the Front End intance
On the EC2 intances list, select the intance where the back is deployed and click on 'Actions' -> 'Images and templates' and on this screen it is necessary to create the AMI with the configuration on the guide.

### 2.3 Create a Target group
Create a target group fonr the Front End with the configuration on the guide document

### 2.4 Create a Load Balancer

Create aLoad Balancer with the configuration of the guide but on Basic configuration, use the default configuration on the guide. **Scheme:** internet facing

![image](https://user-images.githubusercontent.com/53226911/168497644-f65bf559-55d6-4c77-985f-1cf4b59c854e.png)


### 2.5 Create a Lauch template

Create the Launch template with the configuration from the guide document and select the Ami from the Front End created on the numeral `2.2`.

### 2.5 Create the Auto Scaling group for the Front

Create the autoScaling group for the back application with the same configuration on the document guide.






    




