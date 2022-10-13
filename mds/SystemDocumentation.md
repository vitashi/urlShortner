# Requirements
To build a URL shortening service that can exposes two APIs; encode and decode.
The two API endpoint should return JSON.

| Functional Requirements  | Non functional requirements |
| ------------- | ------------- |
| `/encode` API  | Performance  |
| `/decode` API  | Availability  |
| APIs to return JSON  | Consistency  |
|  | Scalability  |
|  | Durability  |

## Functional requirements

### Encoding
For a URL shortening service, this endpoint will be responsible for the reduction of number of characters for a url.

What to look out for;
- Each URL should only be mapped to one short URL.
- The API should reject any attempts to shorten a URL more than once.
- Attempts to shorten anything that is not a URL should be rejected.
- One URL should consistently return the same shortened URL

To have a one-one mapping of a short to long URL, the service needs to return a hashed value of the long URL.

<p>The hash value should be aware of collisions; where more than one long URL are hashed to the same short URL. This is harder to guarantee once the system starts to scale (in the fortunate event it becomes popular). Hence the algorithm for this needs to be picked carefully.</p>

The instructions however relax this requirement for now.

Hence to encode, I used a two level hashing; CRC and base62 hashing.

After the hash has been identified, we push it to the store together with it's original URL, the hash being used as the key.

### Decoding
This endpoint's responsibility is to return a URL from it's shortened form to its original (long) form.

What to look out for;
- A shortened URL should return the right long URL used to make it.
- Any attempts to fetch a long URL with an unknown short URL should be rejected.
- Any attempts to decode anything that is not a valid URL should also be rejected.

When a URL is sent for decoding, this API strips off the pathname and checks the store to see if it exists.
It is a successful decoding if the hash exists, and in that case we return the long URL associated with it.


### JSON
This requirement just means that the two APIs should spit out JSON.

To be more useful, the JSON object returned always has a message to say if the call was successful or not, the parameter used to make the call and an HTTP status code to show the status of the call.

## Non-functional requirements

### Performance

The service should encode/ decode as fast as possible.
We try to have the failure scenarios fail as early into the processing as possible too.
When scaling, this needs to be looked at.

### Availability

The service needs to be very available. What is present now will do just fine, but as it starts scaling, there might be issues here and there. In short, this needs to be looked at.

### Consistency

The hashing algorithm should alway produce the same result for the same URL.

### Scalability

The service needs to scale with the number of requests, producing the desired results consistently and at the expected performance levels.

### Durability

The result of an encoding needs to be available to all `decode` requests each time it is required. If the service becomes popular, the system should be able to make the result of an encoding 10 years > after.

The instructions given for the assignment however relax this requirement.


# System
With the absense of durability, this becomes a very light service.

The service is an NodeJS express service that exposes the two API endpoints.
The data store is in-memory, that resides inside the service.

![System representation](https://docs.google.com/drawings/d/e/2PACX-1vRdNZL-hj-oLXj0wgslFDMdG8xacY1_zJ9-D71hkoVT0QvzRDG0_2rhySnMzvnoX0Ar3XZLPr6Z56A3/pub?w=584&h=299)

**Encode** is a `POST` REST endpoint, that returns;
 - `HTTP 202 ACCEPTED` for a successful encoding
 - `HTTP 400 BAD_REQUEST` for a malformed URL.
 - `HTTP 409 CONFLICT` for a duplicate request. (If hash collisions ever happening, this will still be the result for those)

**Decode** is a `GET` REST endpoint that returns;
- `HTTP 200 OK` for a successful decoding
- `HTTP 400 BAD_REQUEST` for a malformed URL
- `HTTP 404 NOT_FOUND` for a encoding the service did not recognize. (If the service restarts, previously encoded URLs will also return this response.)

The **store** is a hash table implementation that exposes two methods;
`put`- to store the encoding - URL mapping.
`get` - to retrieve the long URL using an encoding.