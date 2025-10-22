# First startup

On first startup, you'll get this error:

    environment variable WP_LANGFOLDER not set (or somehow not unicode)

The fix:

```sh
cp .env.default .env
```

And open `.env` and write the path to the installed languages. If installed
languages from apertium nightly, it will be 

`WP_LANGFOLDER=/usr/share/giella`
