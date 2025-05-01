import React from "react";
import { Layout, Briefcase, Shield, Home, User, LogOut } from "lucide-react";

const Dashboard = ({ account, networkId }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                CertChain
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1 text-sm">
                <span className="text-gray-500">Account:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-800 truncate max-w-[200px]">
                  {account}
                </span>
              </div>

              <div className="flex items-center space-x-1 text-sm">
                <span className="text-gray-500">Network:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {networkId === 5
                    ? "Goerli"
                    : networkId === 1
                    ? "Mainnet"
                    : networkId === 80001
                    ? "Mumbai"
                    : `ID: ${networkId}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">
                    Blockchain Certificate Management
                  </span>
                </h2>
                <p className="mt-3 text-lg text-blue-100 max-w-3xl">
                  Generate and verify tamper-proof academic certificates secured
                  by blockchain technology. Issue certificates with confidence
                  and enable instant verification.
                </p>
                <div className="mt-8 flex space-x-4">
                  <a
                    href="#/generate"
                    className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-indigo-700 hover:bg-blue-50"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Generate Certificate
                  </a>
                  <a
                    href="#/verify"
                    className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-blue-800 text-white hover:bg-blue-900"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Verify Certificate
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Platform Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Certificate Generation
                      </h4>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      Create and issue tamper-proof academic certificates with
                      custom fields, all secured by blockchain technology.
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#/generate"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Issue Certificate
                    </a>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Certificate Verification
                      </h4>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      Instantly verify the authenticity of any certificate using
                      its unique certificate ID.
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#/verify"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Verify Certificate
                    </a>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Blockchain Security
                      </h4>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      All certificates are secured by blockchain technology,
                      ensuring they cannot be tampered with or forged.
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Platform Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-sm font-medium text-blue-800">
                  Total Certificates
                </p>
                <p className="mt-1 text-3xl font-semibold text-blue-900">0</p>
              </div>
              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-sm font-medium text-green-800">
                  Verifications Today
                </p>
                <p className="mt-1 text-3xl font-semibold text-green-900">0</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-md">
                <p className="text-sm font-medium text-purple-800">
                  Connected Institutions
                </p>
                <p className="mt-1 text-3xl font-semibold text-purple-900">1</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0">
              &copy; 2025 CertChain. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
