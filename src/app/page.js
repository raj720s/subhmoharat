import axioss from "@/utils/axios";

const ping = async () => {
  const res = await (await axioss.get('/ping')).data
  return res.message;
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">
        {ping()}
      </h1>
    </main>
  );
}
