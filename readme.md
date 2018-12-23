<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.






-->
<p align="center">
  <a href="/../../#readme">
    <img src="https://github.com/brillout/wildcard-api/raw/master/docs/images/logo-with-text.svg?sanitize=true" height=80 alt="Wildcard API"/>
  </a>
</p>
<p align='center'><a href="/../../#readme"><b>Intro</b></a> &nbsp; | &nbsp; <a href="/docs/usage-manual.md#readme">Usage Manual</a> &nbsp; | &nbsp; <a href="/example/#readme">Example</a></p>

Project goals:
 1. JavaScript library to easily create a custom API.
 2. Debunk the common misconception that a generic API is a silver bullet.
    REST and GraphQL are great tools for large applications
    but are less suited for prototypes and smaller apps.

With Wildcard,
creating an API endpoint is as easy as creating a JavaScript function:

~~~js
// Node.js Server

const {endpoints} = require('wildcard-api');

// We define a `hello` function on the server
endpoints.hello = function(name) {
  return {message: 'Hi '+name};
};
~~~

~~~js
// Browser

import {endpoints} from 'wildcard-api/client';

(async () => {
  // Wildcard makes our `hello` function available in the browser
  const {message} = await endpoints.hello('Alice');
  console.log(message); // Prints `Hi Alice`
})();
~~~

That's the only thing Wildcard does:
It makes functions defined on the server "callable" in the browser.
That's it.
Wildcard takes care of the HTTP request and serialization.
How you retrieve/mutate data is up to you and
you can use SQL, ORM, NoSQL, etc.

#### Contents

 - [Why Wildcard](#why-wildcard)
 - [Usage](#usage)
 - [Wildcard vs GraphQL/REST](#wildcard-vs-graphqlrest)


<br/>

### Why Wildcard

REST and GraphQL are great but
creating a schema and permission rules for
a prototype
that has only couple of data requirements is overkill.

In contrast, with Wildcard, you simply define JavaScript functions on Wildcard's `endpoints` object.
No schema,
no permission rules.

In essence,
these endpoint functions you define act as fine-grained "permission holes":
You allow your clients to access and do things on a case-by-case basis.
This is a simple alternative to permission rules.

The structureless nature of Wildcard is a great fit for rapid prototyping
where flexibility is paramount.
Whereas the rigid structure of a generic API
gets in the way of quickly evolving a prototype.

That said, Wildcard is not suitable for:
 - Third-party clients.
 - Large applications with an API developed independently of the frontend.


## Usage

1. Add the Wildcard routes to your Node.js server.

   With Express:
   ~~~js
   const express = require('express');
   const {getApiResponse} = require('wildcard-api'); // npm install wildcard-api

   const app = express();

   app.all('/wildcard/*' , async (req, res, next) => {
     const {body, statusCode} = await getApiResponse(req);
     res.status(statusCode);
     res.send(body);
     next();
   });
   ~~~

   <details>
   <summary>
   With Hapi
   </summary>

   ~~~js
   const Hapi = require('hapi');
   const {getApiResponse} = require('wildcard-api'); // npm install wildcard-api

   const server = Hapi.Server();

   server.route({
     method: '*',
     path: '/wildcard/{param*}',
     handler: async (request, h) => {
       const {body, statusCode} = await getApiResponse(request.raw.req);
       const resp = h.response(body);
       resp.code(statusCode);
       return resp;
     }
   });
   ~~~
   </details>

   <details>
   <summary>
   With Koa
   </summary>

   ~~~js
   const Koa = require('koa');
   const Router = require('koa-router');
   const {getApiResponse} = require('wildcard-api'); // npm install wildcard-api

   const app = new Koa();

   const router = new Router();

   router.all('/wildcard/*', async (ctx, next) => {
     const {body, statusCode} = await getApiResponse(ctx);
     ctx.status = apiResponse.statusCode;
     ctx.body = apiResponse.body;
   });

   app.use(router.routes());
   ~~~
   </details>

   <details>
   <summary>
   With other server frameworks
   </summary>

   You can use Wildcard with any server framework as long as you
   reply HTTP requests made to `/wildcard/*`
   with the HTTP response body and status code returned by
   `const {body, statusCode} = await getApiResponse({method, url, headers});`
   where `method`, `url`, and `headers` are the HTTP request method, URL, and headers.
   </details>

2. Functions you define
   in Node.js on
   `require('wildcard-api').endpoints`...

   ~~~js
   // Node.js

   const {endpoints} = require('wildcard-api');

   endpoints.myFirstEndpoint = async function () {
     const data = await getData();
     return data;
   };
   ~~~

   ...are then "available" in the browser
   at `require('wildcard-api/client').endpoints`.

   ~~~js
   // Browser

   import {endpoints} from 'wildcard-api/client';

   (async () => {
     const data = await endpoints.myFirstEndpoint();
   })();
   ~~~

<b><sub><a href="#contents">&#8679; TOP  &#8679;</a></sub></b>

<br/>





## Wildcard vs GraphQL/REST

Comparing Wildcard with REST and GraphQL mostly boils down to comparing a custom API with a generic API.

*Custom API*:
An API that fulfills only the data requirements of your clients.
Such as
a Wildcard API or
a [REST level 0](https://martinfowler.com/articles/richardsonMaturityModel.html#level0) API.

*Generic API*:
An API that is designed to support a maximum number of data requirements.
Such as
a GraphQL API or
a [REST level >=1](https://martinfowler.com/articles/richardsonMaturityModel.html#level1) API.

We compare them at
[Usage Manual - Custom API vs Generic API](/docs/usage-manual.md#custom-api-vs-generic-api)
.

<b><sub><a href="#contents">&#8679; TOP  &#8679;</a></sub></b>

<br/>





<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/intro.template.md` instead.






-->
