import "server-only";
import Image from "next/image";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { getDictionary } from "@/get-dictionary";

export default async function AboutUs() {
  const dictionary = await getDictionary("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
              Groupify
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The web framework for content-driven YouTube organization
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                What is Groupify?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Groupify is a powerful, free browser extension designed for Chromium-based browsers that simplifies managing YouTube subscriptions. It enables users to organize their YouTube channels into customizable groups and lists, seamlessly integrating into the YouTube sidebar for easy access.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                This tool is particularly user-friendly and fully open-source, making it accessible to anyone who wants to streamline their YouTube experience. By grouping subscriptions, users can effortlessly keep track of their favorite channels and enjoy a more organized YouTube interface.
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">Instant organization and seamless YouTube integration</p>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Open Source</h3>
                <p className="text-gray-600 dark:text-gray-300">Fully transparent and community-driven development</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <Image
                alt="Groupify Interface"
                className="w-full rounded-2xl shadow-2xl"
                height="400"
                src="/images/logo.svg"
                width="500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The passionate developers behind Groupify
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <div key={member} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={`/placeholder-user.jpg`} />
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Team Member {member}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Lead Developer
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Passionate about creating tools that enhance user experience and productivity.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
