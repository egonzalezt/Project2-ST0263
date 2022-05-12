# Mongodb SETUP

## Understanding Mongodb Replica set

<em>"A replica set is a group of mongod instances that maintain the same data set. A replica set contains several data bearing nodes and optionally one arbiter node. Of the data bearing nodes, one and only one member is deemed the primary node, while the other nodes are deemed secondary nodes.

The primary node receives all write operations. A replica set can have only one primary capable of confirming writes with { w: "majority" } write concern; although in some circumstances, another mongod instance may transiently believe itself to also be primary. [1] The primary records all changes to its data sets in its operation log, i.e. oplog."</em>

![image](https://user-images.githubusercontent.com/53051438/167983616-d617239c-c9ed-4fb7-9d84-adf585113783.png)

also mongodb can add an arbiter who choose with replica or mongodb secondary db transform to the primary db if the primary db fails.

<em>"An arbiter participates in elections but does not hold data, arbiter will always be an arbiter whereas a primary may step down and become a secondary and a secondary may become the primary during an election."</em>

![image](https://user-images.githubusercontent.com/53051438/167984052-50898de6-9272-4489-874b-c2aa22e009fe.png)

[Recovered from mongodb Manual](https://www.mongodb.com/docs/manual/replication/)


## Setup  

### EC2

Mongo db will be deployed on Amazon AWS EC2.

#### Security group

#### Instance setup

**VPC**: VPC-CMS

**Subnet**: Private Subnet 1

**Auto-assign Public IP**: Disable

**Firewall (security groups)**:

* Common Security Groups
  * “Mongo-SG”

**Configure storage**:

* 1 x 8 Gib gp2 root volume

### Install Mongodb

Follow the guide provided by Mongodb team to install Mongodb Community edition on your AWS EC2 Machine [Setup Mongo](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

#### Create super user

afther mongodb installation is done inside your EC2 machine please run 
```bash 
mongo
```
inside mongoshell run this to create admin user

```mongo
> use admin
> db.createUser(
    {
        user: "youradminusedr",
        pwd: "yourbestpassword",
        roles: [ "root" ]
    }
)
> exit
```

When the user is created mongo replica set needs a special key to talk with the other replica sets to make that is necesary to run these commands

```bash
sudo sh -c "openssl rand -base64 756 > /etc/mongod-key"
sudo chmod 400 /etc/mongod-key
```

Now Mongo didn't recognice the key because doesn't have permissions to access to the key
```bash
admin@ip-172-31-31-50:~$ ls -l /etc/mongod-key
-r-------- 1 root root 1024 May 12 00:04 /etc/mongod-key
```

**Give permissions to mongodb**

```bash
sudo chown -R mongodb /etc/mongo-key
sudo systemctl restart
sudo systemctl status mongod
```
![image](https://user-images.githubusercontent.com/53051438/167985225-73136afc-0122-43fa-8262-76960a2a0089.png)

when the user is created and the key is necesary to change mongodb conf file to enable authentication and config replica set

#### Mongo conf

```mongo
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1,<EC2 PRIVATE IP>


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: "enabled"
  keyFile: /etc/mongod-key

#operationProfiling:

replication:
  replSetName: myreplicaname
#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

```
#### Test Mongodb

```bash
admin@ip-172-31-31-50:~$ mongo -u youradminusedr -p yourbestpassword
MongoDB shell version v5.0.8
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7c503506-5f17-44d9-8e83-86bce24ee46a") }
MongoDB server version: 5.0.8
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
```

## Configure replicas

To facilitate the work create AWS AMI to make deploy the same mongodb machine w
