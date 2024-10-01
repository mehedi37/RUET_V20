import greetings from "@/lib/greetings";

export default async function DashBoard() {
  const greeting = await greetings();
  return (
    <div className="text-center m-6">
      <h1 className="text-3xl">{greeting}</h1>
    </div>
  );
}
