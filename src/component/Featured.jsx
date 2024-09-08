
import {Link} from "react-router-dom"

const Featured = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter text-[#4158D0] sm:text-4xl lg:text-5xl">
              Featured Articles
            </h2>
            <p className="max-w-[90%] md:max-w-[900px] text-muted-foreground text-base md:text-xl">
              Check out our featured news articles for in-depth coverage on the
              latest topics.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-2 lg:gap-12">
          {["Article 4", "Article 5"].map((title, index) => (
            <div
              key={index}
              className="flex flex-col justify-between space-y-4"
            >
              <img
                src="/placeholder.svg"
                alt={`Featured Article ${index + 1}`}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#4158D0] sm:text-xl">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Description for {title}.
                </p>
                <Link
                  to="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#4158D0] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featured
