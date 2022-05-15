# How we manage to get an SSL certificate using CloudFlare


## 1. Go to freenom 
On freenom look for a domain name server with availability to get, in our case, we decided to use the domain <a href="https://messirvenloslibros.ga">messirvenloslibros.ga</a>
![image](https://user-images.githubusercontent.com/53226911/168494113-4f29c6e3-c025-40c2-93af-e07079c65ffa.png)



## 2. Buy the Domain
Click on get it now, and on check out to order the domain.

![image](https://user-images.githubusercontent.com/53226911/168494194-d40d95ef-485d-4e61-98e6-c3cab8120722.png)

## 3. Manage the DNS to redirect the URL of the load balancer

On 'services' -> 'My domains' we select the domain we want to use and click on 'Manage Domain' 

![image](https://user-images.githubusercontent.com/53226911/168494390-9eeea0ac-413d-43f1-89ca-c923daae68f6.png)


## 4. Manage freenom DNS records

Go to manage Freenom DNS and add two txt records with the DNS of the load balancer, in this case our load balancer DNS is <a href="LB-FRONT-1873280473.us-east-1.elb.amazonaws.com">LB-FRONT-1873280473.us-east-1.elb.amazonaws.com</a>

![image](https://user-images.githubusercontent.com/53226911/168494538-ec4a1090-90cc-4094-b1ca-7ed5c9949292.png)








