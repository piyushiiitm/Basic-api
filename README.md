## Installation:
* Install docker and docker compose
* Install Node js(v20.10.0)
* Run following command on terminal:
  ```
  docker-compose -f mysql-docker-compose.yml up -d
  docker-compose -f redis-docker-compose.yml up -d
  docker-compose -f zookeeper-kafka-docker-compose.yml up -d
  git clone https://github.com/piyushiiitm/assignment.git
  cd assignment
  npm install
  npm start
  ```
After a successful start we can run on the browser http://localhost:3005/health. it will give response message healthy.
### Infrastructure and scaling write-up(Node js, express, mysql, kafka)
#### 1. Node js:
  1. Horizontal Scaling: we can add more node js instance.
  1. We can use the process manager (pm2) for clustering, load balancing, and process monitoring.
  1. We can implement auto-scaling mechanisms to automatically adjust the number of Node.js instances based on demand.

#### 2. Kafka:
1. Partitioned allows data to be distributed across multiple servers to ensure parallel processing of data to improve throughput.
1. Enable replication for fault tolerance. Replicas ensure that data is replicated across multiple brokers.
1. We can adjust the number of partitions and replication factors based on the specific requirements of each topic.
1. We can scale consumer instances horizontally to handle increased throughput.
1. Backup Kafka data to ensure data integrity and availability.

 
 #### 3. Redis:
  1. Replication:create multiple replicas of master server for read operations.
  1. Partitioning:we can partition data into multiple shards across multiple redis instances.
  1. We can enable cluster mode to support partitioning and replication for high availability and fault tolerance.
 
 #### 4. Mysql:
  1. Horizontal Scaling (distribute the database load across multiple servers).
  1. Sharding (partitioning data across multiple databases) or using read replicas for read-intensive workloads.
  1. Replication to create read replicas for distributing read queries to offload read operations from the primary database.
  1. If the dataset is large, we can consider partitioning your tables.
  1. Use connection pooling to efficiently manage connections and reduce overhead.

### Assumptions or decisions:
  1. Post id always be a unique id and post data will not be updated.
  1. Analysis computation will be eventually consistent.
  1. Added default value for rate limiter.
  1. In local host, client ip is not getting properly in node (::1) so added one function to get random ip address.
  1. Added default eviction policy is LRU in redis in config.command is in installation/command.txt file.
  1. Added .env value based on local setup.







