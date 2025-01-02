// export default function Home() {
//   return (
//     <>
//       <h1>Hallo - test</h1>
//     </>
//   );
// }
import React from "react";
import "../styles/style.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
