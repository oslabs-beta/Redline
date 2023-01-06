import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=optional" 
      rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
