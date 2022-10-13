### Introduction
Here I just want to mention several things I would consider to scale this service.

#### - Add datastore(s).
The service currently uses an in-memory data store which is not scalable. To take care of that, we need to add a database. This guarantee's durability of the URL's encoded.

The data we need to store is mostly key-value oriented. Also if the service becomes too busy, it should also be easy to horizantaly scale the datatabase. For this reason, A **Redis** database would be a good fit.

#### - Caching

For one URL, more decode compared to encode API calls will be made. Since the encoded value of one URL remains the same throughout the lifetime of this service, to avoid hitting the database all the time a decode request is made, we could cache the result of a decode. This means if > 1 request is made to decode one URL, only the first one involves the DB, the rest get fulfilled via cache.

Fortunately, **Redis** is widely known or thought of as a cache because of it's support for fast reads. 

#### - Horizontal scaling.

With one service, only so much can be done. When things become busier, more resources are needed.
For this reason, we need to spin up more instances of the same service, with the aim of making them share the load.

EKS (Kubernetes) for container orchestration, or go serverless route of the AWS Fargate to help with this.


#### - Load balancing

With more services, there needs to be a way to elect a service to handle a request. When an API call is made, with vey many available services, a **load balancer** will try to distribute the traffic evenly among them.

There are many tools here; HAProxy, Nginx or AWS ELB could help here. 

#### - Segregation of responsibilty.

Currenly, both APIs are hosted in one service. Horizantal scaling will have the service grow, and as the service grows, both API's grow with it.

However, in the real world, if the service is used correctly, there will be more decode requests than encode requests. That is, for one encoding request, > 1 decoding requests will be made.

The database requests will also mirror this trend, with more requests to decode that to encode.

This means scaling the encode requests at the same rate as decode requests might be considered wasteful.

It might make sense to rip the service into two, to have encode have its own service that scales independently from the decode service.

For the database, we could have replication, where multiple databases with the same data exist to serve the services. Among them, one leader is chosen where all the write requests go to. Once in, the same data is copied to all the other members of the cluster. Decode requests are loadbalanced to the databases handling the copies.

That is, a request, from the encode service puts a new entry into the main database, the database replicates this entry to all databases in its cluster, and when the decode request comes in, the decode service serves this request via a replica database (probably optimized for read).

This makes the both endpoints more available. However, there are instances when a decode request might come in before the data is copied over to the replicas, introducing eventual consistency.

#### - Analysis

Usage statistics might be needed eventually. For this, there will be additional things to consider.

For instance, we would not want to serve the analysis requests on the same service or databases. The database might not even be the most ideal storing large amounts of data. Maybe we consider using **Cassandra** no-sql database, a column oriented database, which can be good for large queries or predetermined queries.

With this addition, there might be a need to have a streaming service like **Kafka** to asynchronously push usage statistics to the database.

### - Summary
For this service to operate at scale, there will be various decisions to be made. There needs to be more visibility by adding tools like **Datadog** to have enough data before taking any. 
A lot more can be talked about or done to scale the service. However, each comes with a risk of additional complexity. All their pros and cons should be looked at keenly before picking a direction.