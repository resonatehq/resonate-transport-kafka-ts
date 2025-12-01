import { type Context, Resonate } from "@resonatehq/sdk";
import { Kafka } from "./src/index";

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

main();
