import React, { useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Web3 from "web3";
import Certification from "./Certification.json";
import Dashboard from "./pages/Dashboard";
import CollegePanel from "./pages/CollegePanel";
import VerifyPanel from "./pages/VerifyPanel";
import NavBar from "./components/ui/Navbar";

// Wrapper component to conditionally render navbar
const AppLayout = ({ children, account, networkId, showNavBar }) => {
  if (!showNavBar) {
    return children;
  }

  return (
    <>
      <NavBar account={account} networkId={networkId} />
      {children}
    </>
  );
};

// Route wrapper that controls navbar visibility
const AppRoute = ({ element, account, networkId, showNavBar = true }) => {
  return (
    <AppLayout account={account} networkId={networkId} showNavBar={showNavBar}>
      {element}
    </AppLayout>
  );
};

const App = () => {
  const [account, setAccount] = useState("");
  const [certContract, setCertContract] = useState(null);
  const [networkId, setNetworkId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlockchain = async () => {
      try {
        setLoading(true);

        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);

          try {
            // Request account access
            await window.ethereum.request({ method: "eth_requestAccounts" });

            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const networkId = await web3.eth.net.getId();
            setNetworkId(networkId);

            const deployedNetwork = Certification.networks[networkId];
            if (!deployedNetwork) {
              throw new Error(
                `Contract not deployed on network ID: ${networkId}`
              );
            }

            const instance = new web3.eth.Contract(
              Certification.abi,
              deployedNetwork.address
            );
            setCertContract(instance);

            // Listen for account changes
            window.ethereum.on("accountsChanged", (accounts) => {
              setAccount(accounts[0]);
            });

            // Listen for network changes
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });
          } catch (error) {
            setError(
              "Failed to connect to MetaMask. Please check your wallet connection."
            );
            console.error(error);
          }
        } else {
          setError(
            "MetaMask not detected. Please install MetaMask to use this application."
          );
        }
      } catch (error) {
        setError(
          "An unexpected error occurred while connecting to the blockchain."
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBlockchain();

    // Cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading Web3 & Contract...
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <svg
              className="h-12 w-12 text-red-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              Connection Error
            </h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppRoute
              element={<Dashboard account={account} networkId={networkId} />}
              account={account}
              networkId={networkId}
              showNavBar={false} // No NavBar on Dashboard as requested
            />
          }
        />
        <Route
          path="/generate"
          element={
            certContract ? (
              <AppRoute
                element={
                  <CollegePanel contract={certContract} account={account} />
                }
                account={account}
                networkId={networkId}
                showNavBar={true} // Show NavBar
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/verify"
          element={
            certContract ? (
              <AppRoute
                element={<VerifyPanel contract={certContract} />}
                account={account}
                networkId={networkId}
                showNavBar={true} // Show NavBar
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
