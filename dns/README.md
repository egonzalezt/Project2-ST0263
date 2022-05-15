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

## 5. Migrate Domain from Freenom to CloudFlare

Go to cloudflare and create an account

### 5.1 go to 'websites' on Cloudflare dashboard
On the input text enter the domain name from freenom and click the button 'add site'
![image](https://user-images.githubusercontent.com/53226911/168494634-bd5b9a32-ffec-4d28-9a76-65daf8a3ea3b.png)

### 5.2 Click on next with the default configuration.
Cloud flare will ask you to change the Freenom nameservers to the cloudflare DNS.
![image](https://user-images.githubusercontent.com/53226911/168494743-93c9c3d8-2c9a-4a06-8267-49c138b2e6fc.png)

### 5.3 Change the Freenom nameservers to CloudFlare DNS

Go to manage the domain and on 'management tools' -> 'nameserver' Click on "Use custom nameservers"
![image](https://user-images.githubusercontent.com/53226911/168494877-f1d7c562-bd54-4615-b64e-527f226e7a19.png)

## 6. Activate SSL encryptation

After wait around 10 minutes for the nameservers change to be done, go to the dashboard on the left at CloudFlare and click on "SSL/TLS" and select flexible encryptation

![image](https://user-images.githubusercontent.com/53226911/168495049-79458c82-7459-432c-9b13-a8677a2216e8.png)


This is going to encrypt the traffic between the client and CloudFlare using Https, but the traffic between CloudFlare and the Load balancer is using regutlar Http. 
This is intentional because we couldn't manage to get a SSL certificate for the load balancer itself because the students AWS account don't allows us to create or import SSL certificates.

**Note**: this is bad practice, the ideal would be to have a full encryptation or a full strict encryptation, but due to the limitations on the AWS account we couldn't do it.


## 7. Final page with the SSL certificate
 
![image](https://user-images.githubusercontent.com/53226911/168495210-8f649447-39f4-4675-9951-36a9586e116f.png)

 








