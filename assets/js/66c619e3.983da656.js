"use strict";(self.webpackChunkproject_2=self.webpackChunkproject_2||[]).push([[969],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return h}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),u=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),s=u(a),h=r,f=s["".concat(l,".").concat(h)]||s[h]||p[h]||o;return a?n.createElement(f,i(i({ref:t},d),{},{components:a})):n.createElement(f,i({ref:t},d))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=s;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<o;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},1490:function(e,t,a){a.r(t),a.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return p}});var n=a(7462),r=a(3366),o=(a(7294),a(3905)),i=["components"],c={},l="Load Balancers",u={unversionedId:"load-balancer/setup",id:"load-balancer/setup",title:"Load Balancers",description:"On the load balancers section, we create two different load balancers, one for the Front to manage the public routing and another one for the backend to manage the private request from the front end on different availability zones.",source:"@site/docs/load-balancer/setup.md",sourceDirName:"load-balancer",slug:"/load-balancer/setup",permalink:"/Project2-ST0263/docs/load-balancer/setup",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/load-balancer/setup.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Load Balancer",permalink:"/Project2-ST0263/docs/category/load-balancer"},next:{title:"Mongodb Replicaset",permalink:"/Project2-ST0263/docs/category/mongodb-replicaset"}},d={},p=[{value:"1. Back Load balancer",id:"1-back-load-balancer",level:2},{value:"1.1 Create the AMI for the back intance",id:"11-create-the-ami-for-the-back-intance",level:3},{value:"1.2 Create a Target group",id:"12-create-a-target-group",level:3},{value:"1.3 Create a Load Balancer",id:"13-create-a-load-balancer",level:3},{value:"1.4 Create a Lauch template",id:"14-create-a-lauch-template",level:3},{value:"1.5 Create the Auto Scaling group for the back",id:"15-create-the-auto-scaling-group-for-the-back",level:3},{value:"2. Front Load Balancer",id:"2-front-load-balancer",level:2},{value:"2.1 Pre configuration on the Front End intance",id:"21-pre-configuration-on-the-front-end-intance",level:3},{value:"2.2 Create the AMI for the Front End intance",id:"22-create-the-ami-for-the-front-end-intance",level:3},{value:"2.3 Create a Target group",id:"23-create-a-target-group",level:3},{value:"2.4 Create a Load Balancer",id:"24-create-a-load-balancer",level:3},{value:"2.5 Create a Lauch template",id:"25-create-a-lauch-template",level:3},{value:"2.5 Create the Auto Scaling group for the Front",id:"25-create-the-auto-scaling-group-for-the-front",level:3}],s={toc:p};function h(e){var t=e.components,a=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"load-balancers"},"Load Balancers"),(0,o.kt)("p",null,"On the load balancers section, we create two different load balancers, one for the Front to manage the public routing and another one for the backend to manage the private request from the front end on different availability zones."),(0,o.kt)("p",null,"The process to create the two different Load balacers was the same, but it changes a little because the load balancer for the back is private back. "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note")," using this schema it is neccessary for the Back load balancer to be deployed at first because the Front end is going to make the requests to this load balancer."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/53226911/168496246-339b56d1-3894-4a47-b276-1aa145863a29.png",alt:"image"})),(0,o.kt)("h2",{id:"1-back-load-balancer"},"1. Back Load balancer"),(0,o.kt)("h3",{id:"11-create-the-ami-for-the-back-intance"},"1.1 Create the AMI for the back intance"),(0,o.kt)("p",null,"On the EC2 intances list, select the intance where the back is deployed and click on 'Actions' -> 'Images and templates' and on this screen it is necessary to create the AMi with the configuration on the guide."),(0,o.kt)("h3",{id:"12-create-a-target-group"},"1.2 Create a Target group"),(0,o.kt)("p",null,"Create a target group with the configuration on the guide document"),(0,o.kt)("h3",{id:"13-create-a-load-balancer"},"1.3 Create a Load Balancer"),(0,o.kt)("p",null,"Create aLoad Balancer with the configuration of the guide but on Basic configuration change the option on scheme: from internet facing to internal"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/53226911/168496563-5f876e13-75cd-4d4b-8059-fed2d68ab4fb.png",alt:"image"})),(0,o.kt)("h3",{id:"14-create-a-lauch-template"},"1.4 Create a Lauch template"),(0,o.kt)("p",null,"Create the Launch template with the configuration from the guide document and select the Ami from the Back created on the numeral ",(0,o.kt)("inlineCode",{parentName:"p"},"1.1"),"."),(0,o.kt)("h3",{id:"15-create-the-auto-scaling-group-for-the-back"},"1.5 Create the Auto Scaling group for the back"),(0,o.kt)("p",null,"Create the autoScaling group for the back application with the same configuration on the document guide."),(0,o.kt)("h2",{id:"2-front-load-balancer"},"2. Front Load Balancer"),(0,o.kt)("h3",{id:"21-pre-configuration-on-the-front-end-intance"},"2.1 Pre configuration on the Front End intance"),(0,o.kt)("p",null,"On the Front End we decided to use a Reverse Proxy to create a route for ",(0,o.kt)("inlineCode",{parentName:"p"},"/api/books")," because the request the FrontEnd makes is done on local to that path."),(0,o.kt)("p",null,"In order to do that, we decided to install nginx on the local machine"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo apt-get install nginx\n")),(0,o.kt)("p",null,"We also had to change the execution port of the docker because before it was using the same port as nginx. in order to do that we modify the ",(0,o.kt)("inlineCode",{parentName:"p"},"docker-compose.yml")," file with the following content "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'version: "3.2"\nservices:\n  front:\n    image: front.image:latest\n    build: ./\n    ports:\n    - 8000:80\n    expose:\n    - "80"\n    restart: always\n    environment:\n        NODE_ENV: production\n        PORT: 80\n        HOST: 0.0.0.0\n')),(0,o.kt)("p",null,"And, run the container"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo docker-compose up\n")),(0,o.kt)("p",null,"We had to edit the file on ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/nginx/sites-available/default")," for the nginx to bind the router ",(0,o.kt)("inlineCode",{parentName:"p"},"/api/books")," from another location, and to redirect the traffic from the port 80 to the port 8000."),(0,o.kt)("p",null,"We added the following configuration."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"server {\n        listen 80 default_server;\n        listen [::]:80 default_server;\n\n        root /var/www/html;\n\n        index index.html index.htm index.nginx-debian.html;\n\n        server_name _;\n\n        location / {\n              proxy_pass http://localhost:8000;\n              #proxy_set_header Host $host;\n\n              proxy_set_header        Host $host:$server_port;\n              proxy_set_header        X-Real-IP $remote_addr;\n              proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;\n              proxy_set_header        X-Forwarded-Proto $scheme;  \n      }\n\n      location /api/books {\n              proxy_pass http://internal-LB-BACK-207909715.us-east-1.elb.amazonaws.com/api/books;\n      }\n\n  }\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note:")," It is neccesarry to the load balancer of the back to be deployed at first because we need the DNS of this to paste on the nginx configuration."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"This is all the pre configuration we need for the Front end load balancer")),(0,o.kt)("h3",{id:"22-create-the-ami-for-the-front-end-intance"},"2.2 Create the AMI for the Front End intance"),(0,o.kt)("p",null,"On the EC2 intances list, select the intance where the back is deployed and click on 'Actions' -> 'Images and templates' and on this screen it is necessary to create the AMI with the configuration on the guide."),(0,o.kt)("h3",{id:"23-create-a-target-group"},"2.3 Create a Target group"),(0,o.kt)("p",null,"Create a target group fonr the Front End with the configuration on the guide document"),(0,o.kt)("h3",{id:"24-create-a-load-balancer"},"2.4 Create a Load Balancer"),(0,o.kt)("p",null,"Create aLoad Balancer with the configuration of the guide but on Basic configuration, use the default configuration on the guide. ",(0,o.kt)("strong",{parentName:"p"},"Scheme:")," internet facing"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/53226911/168497644-f65bf559-55d6-4c77-985f-1cf4b59c854e.png",alt:"image"})),(0,o.kt)("h3",{id:"25-create-a-lauch-template"},"2.5 Create a Lauch template"),(0,o.kt)("p",null,"Create the Launch template with the configuration from the guide document and select the Ami from the Front End created on the numeral ",(0,o.kt)("inlineCode",{parentName:"p"},"2.2"),"."),(0,o.kt)("h3",{id:"25-create-the-auto-scaling-group-for-the-front"},"2.5 Create the Auto Scaling group for the Front"),(0,o.kt)("p",null,"Create the autoScaling group for the back application with the same configuration on the document guide."))}h.isMDXComponent=!0}}]);