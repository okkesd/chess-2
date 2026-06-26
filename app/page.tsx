import Image from "next/image";
import Board from "./board/board";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-10 px-100 bg-white dark:bg-black sm:items-start">
        <div>Go to /main</div>
      </main>
    </div>
  );
}
