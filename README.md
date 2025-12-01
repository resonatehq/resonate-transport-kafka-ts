# @resonatehq/kafka

`@resonatehq/kafka` is the official [Kafka](https://kafka.apache.org) transport binding for running Distributed Async Await, Resonate’s durable-execution framework. This package allows Resonate workers to communicate over Apache Kafka, using Kafka as a durable, ordered, and scalable message bus across processes and machines.

## Quick Start

### Installation
```bash
npm install @resonatehq/kafka
```

### Example

```typescript
import { type Context, Resonate } from "@resonatehq/sdk";
import { Kafka } from "@resonatehq/kafka";

async function main() {
  const transport = new Kafka({ brokers: ["localhost:9092"] });
  await transport.start();

  const resonate = new Resonate({ transport });

  resonate.register("foo", foo);
  resonate.register("baz", baz);

  const v = await resonate.run("foo.1", foo);
  console.log(v);

  resonate.stop();
}

function* foo(ctx: Context): Generator {
  const reply = yield* ctx.rpc("baz");
  return reply;
}

function baz(ctx: Context) {
  return `hello world`;
}

main()
```
### Start Resonate with Kafka enabled
Ensure the `resonate` and `default` Kafka topics exist:
```bash
<!-- start resonate with kafka enabled -->
resonate dev --api-kafka-enable --aio-sender-plugin-kafka-enable
```

### Run the Application
```bash
<!-- run the app -->
npx ts-node app.ts
```
