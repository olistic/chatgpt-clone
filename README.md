# chatgpt-clone

A CLI clone of [OpenAI's famous chat](http://chat.openai.com), with a twist.

## Usage

1. Clone this repo wherever you want:

```sh
$ git clone https://github.com/olistic/chatgpt-clone.git && cd chatgpt-clone
```

2. Create an [OpenAI API key](https://platform.openai.com/account/api-keys) and write it to a `.env` file:

```sh
$ echo 'OPENAI_API_KEY=<your secret key>' > .env
```

3. Launch the CLI:

```sh
$ ./cli.ts
```

> **NOTE:** You'll need to have [Deno](https://deno.land/manual/getting_started/installation) installed for the above command to work.
