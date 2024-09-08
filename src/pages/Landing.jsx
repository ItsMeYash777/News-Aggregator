import { Link } from "react-router-dom"; // Correct import for Link

import Footer from "../component/Footer";
import Featured from "../component/Featured";
import Latest from "../component/Latest";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#4158D0] to-[#C850C0]">
      
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl lg:text-5xl">
                    Stay Informed with the Latest News
                  </h1>
                  <p className="max-w-[90%] md:max-w-[600px] text-white text-base md:text-xl">
                    Discover the most relevant and up-to-date news from trusted
                    sources, all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    to="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-[#4158D0] shadow transition-colors hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <img
                src="28267842_7.svg"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <Latest />
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-br from-[#4158D0] to-[#C850C0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl lg:text-5xl">
                  Discover More
                </h2>
                <p className="max-w-[90%] md:max-w-[900px] text-white text-base md:text-xl">
                  Explore our wide range of news categories and stay up-to-date
                  on the latest developments.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-[#4158D0] shadow transition-colors hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Featured />
      </main>
      <Footer />
    </div>
  );
}
