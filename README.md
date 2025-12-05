# @resonatehq/kafka

`@resonatehq/kafka` is the official [Kafka](https://kafka.apache.org) transport binding for [Resonate](https://github.com/resonatehq/resonate).

## Quick Start

### Install
```bash
npm install @resonatehq/kafka
```

### Run

**app.ts**
```ts
import { type Context, Resonate } from "@resonatehq/sdk";
import { Kafka } from "@resonatehq/kafka";

async function main() {
  const transport = new Kafka({ brokers: ["localhost:9092"] });
  await transport.start();

  const resonate = new Resonate({ transport });
  resonate.register(foo);
  resonate.register(bar);

  const v = await resonate.run("foo.1", foo);
  console.log(v);

  resonate.stop();
}

function* foo(ctx: Context): Generator {
  return yield* ctx.rpc("bar");
}

function bar(ctx: Context) {
  return "hello world";
}

main()
```

Create the following topics:
- resonate
- default

Start the server:
```bash
resonate dev --api-kafka-enable --aio-kafka-enable
```

Start the client:
```bash
npx ts-node app.ts
```
