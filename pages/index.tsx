import dynamic from "next/dynamic";

const MonacoEditor = dynamic(import("../components/MonacoEditor"), {
  ssr: false
});

export default function Home() {
  return (
    <>
      Ahoj
      <MonacoEditor />
    </>
  );
}
