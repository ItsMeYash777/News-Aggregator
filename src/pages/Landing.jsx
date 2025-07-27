import { Link } from "react-router-dom"; 
import Latest from "../component/Latest";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark transition-colors duration-300">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark sm:text-5xl lg:text-6xl leading-tight">
                    Your Gateway to 
                    <span className="block text-primary-800 dark:text-primary-300">
                      Global News
                    </span>
                  </h1>
                  <p className="max-w-[90%] md:max-w-[600px] text-text-secondary-light dark:text-text-secondary-dark text-lg md:text-xl leading-relaxed">
                    Stay informed with comprehensive, real-time news coverage from trusted sources worldwide. 
                    Experience news like never before.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/all-news"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100 px-8 text-base font-semibold text-white dark:text-primary-900 shadow-lg hover:bg-primary-800 dark:hover:bg-primary-200 transition-all duration-200 transform hover:scale-105"
                  >
                    Explore News
                  </Link>
                  <Link
                    to="/top-headlines/general"
                    className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-primary-800 dark:border-primary-300 px-8 text-base font-semibold text-primary-800 dark:text-primary-300 hover:bg-primary-800 dark:hover:bg-primary-300 hover:text-white dark:hover:text-primary-900 transition-all duration-200"
                  >
                    Top Headlines
                  </Link>
                </div>
              </div>
              <div className="lg:order-last animate-slide-up">
                <img
                  src="28267842_7.svg"
                  alt="News illustration"
                  className="mx-auto w-full max-w-md aspect-square object-contain filter dark:invert"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <Latest />

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-surface-light dark:bg-surface-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl mb-4">
                Why Choose NewsHub?
              </h2>
              <p className="max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
                Discover what makes our news platform the preferred choice for millions of readers worldwide.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <div className="text-center p-6 rounded-xl bg-white dark:bg-background-dark shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Real-time Updates
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Get the latest news as it happens with our real-time news feed from trusted sources.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white dark:bg-background-dark shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Global Coverage
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Access news from around the world with our comprehensive country-specific coverage.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white dark:bg-background-dark shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Categorized Content
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Easily find news that matters to you with our organized categories and filtering options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl">
                Start Reading Today
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg md:text-xl">
                Join thousands of readers who trust NewsHub for their daily news. 
                Stay informed, stay ahead.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/all-news"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100 px-8 text-base font-semibold text-white dark:text-primary-900 shadow-lg hover:bg-primary-800 dark:hover:bg-primary-200 transition-all duration-200 transform hover:scale-105"
                >
                  Browse All News
                </Link>
                <Link
                  to="/top-headlines/general"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-primary-800 dark:border-primary-300 px-8 text-base font-semibold text-primary-800 dark:text-primary-300 hover:bg-primary-800 dark:hover:bg-primary-300 hover:text-white dark:hover:text-primary-900 transition-all duration-200"
                >
                  View Top Headlines
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
