import Cards from "@/components/cards";
import Header from "@/components/homehead";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-5">
        <Cards />
        <Cards /> <Cards /> <Cards /> <Cards /> <Cards /> <Cards />
      </div>
    </>
  );
}
