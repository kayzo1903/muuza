import Footer from "@/components/Footer/footer";
import HeaderWrapper from "@/components/Headers/HeaderWrapper";
import AddLocation from "@/components/PlaceInput/AddLocation";


export default function Addlocation() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderWrapper />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50 mb-6 text-center">
            Add Your Location
          </h1>
          <AddLocation />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
}
