import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Layout,
  Briefcase,
  Shield,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

// Import shadcn components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

import { Button } from "./button";
import { Badge } from "./badge";

const NavBar = ({ account, networkId }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getNetworkName = (id) => {
    switch (id) {
      case 1:
        return "Ethereum Mainnet";
      case 3:
        return "Ropsten";
      case 4:
        return "Rinkeby";
      case 5:
        return "Goerli";
      case 42:
        return "Kovan";
      case 80001:
        return "Mumbai";
      case 137:
        return "Polygon";
      default:
        return `Network #${id}`;
    }
  };

  const shortenAddress = (address) => {
    if (!address) return "Not Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get network color based on network type
  const getNetworkColor = (id) => {
    switch (id) {
      case 1:
        return "bg-blue-500"; // Mainnet
      case 137:
        return "bg-purple-500"; // Polygon
      case 80001:
        return "bg-purple-400"; // Mumbai
      case 3:
      case 4:
      case 5:
      case 42:
        return "bg-yellow-500"; // Test networks
      default:
        return "bg-gray-500";
    }
  };

  const getNetworkVariant = (id) => {
    switch (id) {
      case 1:
        return "default"; // Mainnet - blue
      case 137:
      case 80001:
        return "secondary"; // Polygon/Mumbai - purple
      case 3:
      case 4:
      case 5:
      case 42:
        return "warning"; // Test networks - yellow
      default:
        return "outline"; // Unknown - gray
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center">
                <Layout className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  CertChain
                </span>
              </NavLink>
            </div>

            <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 bg-blue-50 rounded-md"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md"
                }
                end
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/generate"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 bg-blue-50 rounded-md"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md"
                }
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Generate Certificate
              </NavLink>
              <NavLink
                to="/verify"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 bg-blue-50 rounded-md"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md"
                }
              >
                <Shield className="mr-2 h-4 w-4" />
                Verify Certificate
              </NavLink>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      account ? "bg-green-500" : "bg-red-500"
                    } mr-2`}
                  ></div>
                  <span className="font-mono">{shortenAddress(account)}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem className="font-mono text-xs">
                  {account || "Not Connected"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Network</DropdownMenuLabel>
                <DropdownMenuItem>
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        networkId ? getNetworkColor(networkId) : "bg-red-500"
                      } mr-2`}
                    ></div>
                    <span>
                      {networkId ? getNetworkName(networkId) : "Not Connected"}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://etherscan.io/address/${account}`,
                      "_blank"
                    )
                  }
                >
                  View on Explorer
                  <ExternalLink className="ml-2 h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center">
                      <Layout className="h-6 w-6 text-blue-600 mr-2" />
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                        CertChain
                      </span>
                    </div>
                  </SheetTitle>
                  <SheetDescription>
                    Blockchain Certificate Management
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                        : "flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    }
                    end
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/generate"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                        : "flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    }
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Generate Certificate
                  </NavLink>
                  <NavLink
                    to="/verify"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                        : "flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    }
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Verify Certificate
                  </NavLink>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                  <div className="px-3 py-2">
                    <h4 className="text-sm font-medium text-gray-500">
                      Wallet
                    </h4>
                    <div className="mt-2 flex items-center">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          account ? "bg-green-500" : "bg-red-500"
                        } mr-2`}
                      ></div>
                      <span className="font-mono text-sm text-gray-700">
                        {shortenAddress(account)}
                      </span>
                    </div>
                  </div>

                  <div className="px-3 py-2">
                    <h4 className="text-sm font-medium text-gray-500">
                      Network
                    </h4>
                    <div className="mt-2">
                      <Badge variant={getNetworkVariant(networkId)}>
                        {networkId
                          ? getNetworkName(networkId)
                          : "Not Connected"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
