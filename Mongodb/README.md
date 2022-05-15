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

```bash
sudo nano /etc/mongod.conf
```

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
  replSetName: myreplicasetname
#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

```
#### Test Mongodb

```bash
admin@ip-x-x-x-x:~$ mongo -u youradminusedr -p yourbestpassword
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

To facilitate the work create AWS AMI to make deploy the same mongodb machine

![image](https://user-images.githubusercontent.com/53051438/167986949-ebcb544e-fa28-4068-88d5-71b8a2ab756c.png)

On EC2 Dashboard go to your instances, select your EC2 machine:

![mongo](https://user-images.githubusercontent.com/53051438/167987543-d1190b34-64b4-46bd-b89d-9e6476fa4958.png)

Set name and description

![image](https://user-images.githubusercontent.com/53051438/167987634-38c8c1d6-fafb-4ea1-9ddb-8d8828e7a78c.png)

on EC2 dashboard go to AMIs

![image](https://user-images.githubusercontent.com/53051438/167987697-9edc8d6e-1bb9-42a3-b825-0c4779965c5b.png)

Select your AMI and select **Launch instance from AMI**
![image](https://user-images.githubusercontent.com/53051438/167987774-8cee2111-cd55-444b-820a-cc1aee2c3bc3.png)

Configure 2 new instances and choose the security group for the machines.

## Configure Replica set

Access to your main principal mongodb replica set

```bash
admin@ip-x-x-x-x:~$ mongo -u youradminusedr -p yourbestpassword
```

```mongo
> rs.initiate(
...     { 
...         _id: "myreplicasetname",
...         members: [
...             {
...                 _id: 0,
...                 host: "<PrincilReplicaIP>:27017"
...             }, { 
...                 _id: 1,
...                 host: "<SecondaryReplicaIP>:27017"
...             }, {
...                 _id: 2,
...                 host: "<SecondaryReplicaIP>:27017"
...             }
...         ]
...     }
... )
{ "ok" : 1 }
myreplicasetname:SECONDARY> exit
bye
```
Now add the user who manage the bookstore schema

```bash
admin@ip-x-x-x-x:~$ mongo -u youradminusedr -p yourbestpassword
```

```mongo
myreplicasetname:PRIMARY> use bookstore
switched to db bookstore

myreplicasetname:PRIMARY> db.createUser(
...     {
...         user: "yourbookstoreadmin",
...         pwd: "yoursupersecretpassword",
...               roles: [
...                 { role: "userAdmin", db: "bookstore" },
...                 { role: "dbAdmin",   db: "bookstore" },
...                 { role: "readWrite", db: "bookstore" }
...              ]
...     }
... )
Successfully added user: {
	"user" : "yourbookstoreadmin",
	"roles" : [
		{
			"role" : "userAdmin",
			"db" : "bookstore"
		},
		{
			"role" : "dbAdmin",
			"db" : "bookstore"
		},
		{
			"role" : "readWrite",
			"db" : "bookstore"
		}
	]
}
myreplicasetname:PRIMARY> exit
bye
```
## Setup MongoConnection for Mongoose

To connect to mongodb please go to [Setup VPC](https://github.com/egonzalezt/Project2-ST0263/tree/main/VPC) when VPC is ready add to your code the connection url for mongodb

`mongodb://yourbookstoreadmin:yoursupersecretpassword@<PrimaryIP>:27017,<SecondaryIP>:27017,<SecondaryIP>:27017/?authSource=bookstore&replicaSet=myreplicasetname`

## Results

If you follow all the steps mongodb replica set was sucessfully created a simple way to check if replica set is sucessfully created run on mongoshell

```mongo
myreplicasetname:PRIMARY> rs.status()
{
	"set" : "myreplicasetname",
	"date" : ISODate("2022-05-12T03:55:42.955Z"),
	"myState" : 1,
	"term" : NumberLong(1),
	"syncSourceHost" : "",
	"syncSourceId" : -1,
	"heartbeatIntervalMillis" : NumberLong(2000),
	"majorityVoteCount" : 2,
	"writeMajorityCount" : 2,
	"votingMembersCount" : 3,
	"writableVotingMembersCount" : 3,
	"optimes" : {
		"lastCommittedOpTime" : {
			"ts" : Timestamp(1652327741, 1),
			"t" : NumberLong(1)
		},
		"lastCommittedWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
		"readConcernMajorityOpTime" : {
			"ts" : Timestamp(1652327741, 1),
			"t" : NumberLong(1)
		},
		"appliedOpTime" : {
			"ts" : Timestamp(1652327741, 1),
			"t" : NumberLong(1)
		},
		"durableOpTime" : {
			"ts" : Timestamp(1652327741, 1),
			"t" : NumberLong(1)
		},
		"lastAppliedWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
		"lastDurableWallTime" : ISODate("2022-05-12T03:55:41.454Z")
	},
	"lastStableRecoveryTimestamp" : Timestamp(1652327691, 1),
	"electionCandidateMetrics" : {
		"lastElectionReason" : "electionTimeout",
		"lastElectionDate" : ISODate("2022-05-12T01:17:01.101Z"),
		"electionTerm" : NumberLong(1),
		"lastCommittedOpTimeAtElection" : {
			"ts" : Timestamp(1652318210, 1),
			"t" : NumberLong(-1)
		},
		"lastSeenOpTimeAtElection" : {
			"ts" : Timestamp(1652318210, 1),
			"t" : NumberLong(-1)
		},
		"numVotesNeeded" : 2,
		"priorityAtElection" : 1,
		"electionTimeoutMillis" : NumberLong(10000),
		"numCatchUpOps" : NumberLong(0),
		"newTermStartDate" : ISODate("2022-05-12T01:17:01.145Z"),
		"wMajorityWriteAvailabilityDate" : ISODate("2022-05-12T01:17:02.243Z")
	},
	"members" : [
		{
			"_id" : 0,
			"name" : "x.x.x.x:27017",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 10671,
			"optime" : {
				"ts" : Timestamp(1652327741, 1),
				"t" : NumberLong(1)
			},
			"optimeDate" : ISODate("2022-05-12T03:55:41Z"),
			"lastAppliedWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
			"lastDurableWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
			"syncSourceHost" : "",
			"syncSourceId" : -1,
			"infoMessage" : "",
			"electionTime" : Timestamp(1652318221, 1),
			"electionDate" : ISODate("2022-05-12T01:17:01Z"),
			"configVersion" : 1,
			"configTerm" : 1,
			"self" : true,
			"lastHeartbeatMessage" : ""
		},
		{
			"_id" : 1,
			"name" : "x.x.x.x:27017",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 9532,
			"optime" : {
				"ts" : Timestamp(1652327731, 1),
				"t" : NumberLong(1)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1652327731, 1),
				"t" : NumberLong(1)
			},
			"optimeDate" : ISODate("2022-05-12T03:55:31Z"),
			"optimeDurableDate" : ISODate("2022-05-12T03:55:31Z"),
			"lastAppliedWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
			"lastDurableWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
			"lastHeartbeat" : ISODate("2022-05-12T03:55:41.158Z"),
			"lastHeartbeatRecv" : ISODate("2022-05-12T03:55:41.157Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncSourceHost" : "172.31.31.50:27017",
			"syncSourceId" : 0,
			"infoMessage" : "",
			"configVersion" : 1,
			"configTerm" : 1
		},
		{
			"_id" : 2,
			"name" : "x.x.x.x:27017",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 9532,
			"optime" : {
				"ts" : Timestamp(1652327731, 1),
				"t" : NumberLong(1)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1652327731, 1),
				"t" : NumberLong(1)
			},
			"optimeDate" : ISODate("2022-05-12T03:55:31Z"),
			"optimeDurableDate" : ISODate("2022-05-12T03:55:31Z"),
			"lastAppliedWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
			"lastDurableWallTime" : ISODate("2022-05-12T03:55:41.454Z"),
			"lastHeartbeat" : ISODate("2022-05-12T03:55:41.160Z"),
			"lastHeartbeatRecv" : ISODate("2022-05-12T03:55:41.158Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncSourceHost" : "172.31.31.50:27017",
			"syncSourceId" : 0,
			"infoMessage" : "",
			"configVersion" : 1,
			"configTerm" : 1
		}
	],
	"ok" : 1,
	"$clusterTime" : {
		"clusterTime" : Timestamp(1652327741, 1),
		"signature" : {
			"hash" : BinData(0,"NUpBGMX/PNBGjoRrj6PYaEEVrZ4="),
			"keyId" : NumberLong("7096652721779900420")
		}
	},
	"operationTime" : Timestamp(1652327741, 1)
}
```
