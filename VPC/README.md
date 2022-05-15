## **Create and configure the VPC**    

We create a VPC called VPC-BS with address block 172.16.0.0/24, with 2 Availability Zones, 2 NAT Gateways (1 per Availability Zone), 2 public subnets (with block `172.16.1.0 /24` and `172.16.4.0 /24`, 1 for each Availability Zone) and 4 private subnets (with block `172.16.2.0 /24`, `172.16.3.0 /24` for Availability Zone 1 and with block `172.16.5.0 /24`, `172.16.6.0 /24` for Availability Zone 1). availability zone 2), no VPC endpoints.  

### **Create and configure security group for the Bastion Host**  

We created a Security Group called SG-Bastion associated to the VPC-BS, and added a new rule with type SSH, source Anywhere-IPv4 (This was so that team members could connect and not be adding and removing addresses, but to For good practice purposes, the corresponding IPv4 addresses should be entered).  

### **Create and configure security group for Front-Back**  

We create a Security Group called SG-Front (we call it that but we use it for both the Front and Back instances) associated with the VPC-BS, and we add two new rules, the first with HTTP type, custom source with address 172.16. 1.0/24 (to receive communication from the Load Balancer located in that subnet), the second with SSH type, custom source with address 172.16.1.0/24 (to receive communication from the Bastion Host located in that subnet).  

### **Create and configure security group for Mongo**  

We create a Security Group called SG-MongoDB associated to the VPC-BS, and we add six new rules, the first four with type custom TCP, custom source with address 172.16.2.0/24 and 172.16.5.0/24, (to receive the communication coming from the Back located in those subnets) and 172.16.3.0/24 and 172.16.4.0/24 (to receive the communication coming from the MongoDB instances located in those subnets), the other two with SSH type, custom source with address 172.16 .1.0/24 and 172.16.4.0/24 (to receive communication from Bastion Hosts located in each Availability Zone).  

### **Create and configure security group for Mongo**    

Create and configure security group for the Load Balancer
We create a Security Group called SG-LB associated to the VPC-BS, and we add two new rules, the first with type HTTPS, source Anywhere-IPv4, the second with type HTTP, source Anywhere-IPv4.  
