# @resonatehq/kafka

`@resonatehq/kafka` is the official transport binding to run **Distributed Async Await**, Resonate's durable-execution framework, on top of [Apache Kafka](https://kafka.apache.org). Use Kafka as the durable, ordered, and scalable message bus that connects Resonate workers across processes and machines.

## Architecture

Resonate is transport-agnostic. When a Durable Function yields a pending Durable Promise (for example via `yield* ctx.rpc()`), the request is published to Kafka and the current worker can continue or terminate. Another worker — possibly on a different machine — consumes the message, executes the target handler, and publishes the reply. Resonate uses message correlation to resume the original flow when the reply arrives.

```ts
function* foo(ctx: Context): Generator {
  // dispatch `baz` across the cluster via Kafka
  const reply = yield* ctx.rpc('baz');
  return reply;
}

function baz(ctx: Context) {
  return `hello world`;
}
```

## Quick Start

```bash
npm install @resonatehq/kafka
```

```ts
import { Resonate, Context } from "@resonatehq/sdk";
import { Kafka } from '@resonatehq/kafka';

function* foo(ctx: Context): Generator {
  // dispatch `baz` across the cluster via Kafka
  const reply = yield* ctx.rpc('baz');
  return reply;
}

function baz(ctx: Context) {
  return `hello world`;
}


const transport = new Kafka({});

const resonate = new Resonate({ transport });

resonate.register('foo', foo);
resonate.register('baz', baz);

```
