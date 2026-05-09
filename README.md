# @resonatehq/kafka

> **⚠️ This plugin is paused.** It targets the legacy Go-based Resonate Server (which had `--api-kafka-enable` flags); those flags do not exist in the current Rust-based Resonate Server (v0.9.7+). **Do not install this for use against the current server.**
>
> **What to use instead, today:** the [Kafka worker pattern](https://github.com/resonatehq-examples/example-kafka-worker-ts) — consume Kafka with `kafkajs` (or `confluent-kafka-python`, `rdkafka` for other languages) and call `resonate.beginRun(messageId, "workflow", ...)` per message. Using the Kafka message ID as the Resonate promise ID gives you idempotent dispatch.
>
> **Roadmap:** Native `kafka://` transport is fully specified in the [server spec](https://github.com/resonatehq/resonate-server-specification/blob/main/brain/abstract-specification/protocol/transports/03-kafka.md) and is planned for a future release. This plugin will be revived (or replaced) once that lands.
>
> Reference examples for the worker pattern:
> - [`example-kafka-worker-ts`](https://github.com/resonatehq-examples/example-kafka-worker-ts)
> - [`example-kafka-worker-py`](https://github.com/resonatehq-examples/example-kafka-worker-py)
> - [`example-kafka-worker-rs`](https://github.com/resonatehq-examples/example-kafka-worker-rs)

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
