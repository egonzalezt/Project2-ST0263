## **Create and configure the VPC**    

We create a VPC called VPC-BS with address block `172.16.0.0/24`, with: 
* 2 Availability Zones 
* 2 NAT Gateways (1 per Availability Zone) 
* 2 Public subnets (with block `172.16.1.0 /24` and `172.16.4.0 /24`, 1 for each Availability Zone)  
* 4 Private subnets (with block `172.16.2.0 /24`, `172.16.3.0 /24` for Availability Zone 1 and with block `172.16.5.0 /24`, `172.16.6.0 /24` for Availability Zone 2)
*  No VPC endpoints.  

![image](https://user-images.githubusercontent.com/53051430/168497834-f9552956-3eb5-490a-b1fa-fb061bf47559.png)
![image](https://user-images.githubusercontent.com/53051430/168497722-bbf81580-d8e9-4b04-96d5-1c22a0095664.png)




### **Create and configure security group for the Bastion Host**  

We created a Security Group called SG-Bastion associated to the VPC-BS, and added a new rule with type SSH, source Anywhere-IPv4 (This was so that team members could connect and not be adding and removing addresses, but to For good practice purposes, the corresponding IPv4 addresses should be entered).

![unknown](https://user-images.githubusercontent.com/53051430/168497497-62c3acb1-d92d-4ccd-9ac2-062e55cc11a5.png)

### **Create and configure security group for Front-Back**  

We create a Security Group called SG-Front (we call it that but we use it for both the Front and Back instances) associated with the VPC-BS, and we add two new rules:
* The first with HTTP type, custom source with address `172.16. 1.0/24` (to receive communication from the Load Balancer located in that subnet)
* The second with SSH type, custom source with address `172.16.1.0/24` (to receive communication from the Bastion Host located in that subnet).  

![unknown](https://user-images.githubusercontent.com/53051430/168497508-1fc9e9f4-15bb-4d32-b1aa-ff8dcdb8a9e4.png)

### **Create and configure security group for Mongo**  

We create a Security Group called SG-MongoDB associated to the VPC-BS, and we add six new rules:
* The first 4 with type custom TCP, custom source with address `172.16.2.0/24` and `172.16.5.0/24`, (to receive the communication coming from the Back located in those subnets) and `172.16.3.0/24` and `172.16.4.0/24` (to receive the communication coming from the MongoDB instances located in those subnets)
*  The other two with SSH type, custom source with address `172.16.1.0/24` and `172.16.4.0/24` (to receive communication from Bastion Hosts located in each Availability Zone).  

![image](https://user-images.githubusercontent.com/53051430/168497699-b2335ec1-7847-4665-a8b8-3da927b19ed4.png)


### **Create and configure security group for the Load Balancer**

We create a Security Group called SG-LB associated to the VPC-BS, and we add two new rules:
* The first with type HTTPS, source Anywhere-IPv4 
* The second with type HTTP, source Anywhere-IPv4.  

![unknown](https://user-images.githubusercontent.com/53051430/168497542-ef16122f-a2cc-46d7-8e64-b8496415a104.png)

