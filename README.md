# @resonatehq/kafka

`@resonatehq/kafka` is the official [Kafka](https://kafka.apache.org) transport binding for the [Resonate](https://github.com/resonatehq/resonate) TypeScript SDK. It replaces the default HTTP transport, routing task invocations and resumptions through Kafka topics instead.

## Installation

```bash
npm install @resonatehq/kafka
```

## Usage

Pass a `Kafka` transport instance when constructing `Resonate`:

```ts
import { type Context, Resonate } from "@resonatehq/sdk";
import { Kafka } from "@resonatehq/kafka";

const transport = new Kafka({ brokers: ["localhost:9092"] });
await transport.start();

const resonate = new Resonate({ transport });

resonate.register("foo", function* foo(ctx: Context): Generator {
  return yield* ctx.rpc("bar");
});

resonate.register("bar", function bar(_ctx: Context) {
  return "hello world";
});

const result = await resonate.run("foo.1", "foo");
console.log(result); // "hello world"

await resonate.stop();
```

Before running, create the required Kafka topics:

```
resonate
default
```

Start the Resonate server with Kafka enabled:

```bash
resonate dev --api-kafka-enable --aio-kafka-enable
```

Then run your application:

```bash
npx ts-node app.ts
```

## Examples

- [Kafka Worker Example](https://github.com/resonatehq-examples/example-kafka-worker-ts)
- [Durable Research Agent over Kafka](https://github.com/resonatehq-examples/example-openai-deep-research-agent-kafka-ts)

## Documentation

Full documentation: [docs.resonatehq.io](https://docs.resonatehq.io)
