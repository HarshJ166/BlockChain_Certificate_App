# 🎓 Blockchain Certificate Verification DApp

A decentralized application (DApp) for generating and verifying academic certificates on the Ethereum blockchain. Colleges can issue certificates, and industries or employers can verify their authenticity.

---

## 📁 Project Structure

```
blockchain-certificate-dapp
├── client/                 # React frontend
│   ├── public/             # Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/ui/  # UI components (buttons, cards, dialogs, etc.)
│   │   ├── hooks/          # Custom React hooks (e.g., use-toast)
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page-level components (CollegePanel, VerifyPanel, Dashboard)
│   │   ├── App.js          # Root React component
│   │   ├── web3.js         # Web3 & contract setup
│   │   ├── Certification.json  # ABI + network info
│   │   └── index.js
│   ├── package.json        # Frontend dependencies & scripts
│   ├── package-lock.json
│   ├── tailwind.config.js  # Tailwind CSS config
│   └── postcss.config.js   # PostCSS plugins config
│
├── contracts/              # Solidity smart contracts
│   └── Certification.sol   # Certificate generation & verification logic
│
├── migrations/             # Truffle migration scripts
│   └── 2_deploy_contracts.js
│
├── test/                   # Smart contract tests (optional)
│
├── truffle-config.js       # Truffle network & compiler settings
└── README.md               # This file
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or v20 (LTS)  
  Download: https://nodejs.org/
- **Truffle** CLI  
  ```bash
  npm install -g truffle
  ```
- **Ganache GUI**  
  Download: https://trufflesuite.com/ganache/
- **MetaMask** browser extension  
  Chrome: https://chrome.google.com/webstore/detail/metamask/  
  Firefox: https://addons.mozilla.org/firefox/addon/ether-metamask/

---

## 🚀 Setup & Deployment

### 1. Clone Repository

```bash
git clone https://github.com/your-username/blockchain-certificate-dapp.git
cd blockchain-certificate-dapp
```

### 2. Start Ganache GUI

1. Open Ganache GUI.  
2. Create a new workspace or use Quickstart (Ethereum).  
3. Note the RPC Server URL (e.g., `http://127.0.0.1:7545`).

### 3. Configure Truffle

Ensure `truffle-config.js` includes:

```js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,       // Match Ganache GUI RPC port
      network_id: "*", // Match any network
    },
  },
  compilers: {
    solc: {
      version: "0.8.13", // Match your Solidity version
    },
  },
};
```

### 4. Compile & Deploy Smart Contracts

```bash
truffle compile
truffle migrate --network development
```

- After migration, the contract address and ABI are written to `build/contracts/Certification.json`.
- Copy `build/contracts/Certification.json` to `client/src/Certification.json`.

---

## 🌐 Frontend (React.js + Tailwind CSS)

### 5. Navigate to Frontend

```bash
cd client
```

### 6. Install Dependencies

```bash
npm install
```

### 7. Configure Tailwind CSS

1. Initialize Tailwind:
   ```bash
   npx tailwindcss init -p
   ```
2. Update `tailwind.config.js`:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx}",
       "./public/index.html",
     ],
     theme: { extend: {} },
     plugins: [],
   };
   ```
3. In `src/index.css`, add:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### 8. Web3 & Contract Setup

File: `client/src/web3.js`

```js
import Web3 from "web3";
import Certification from "./Certification.json";

const web3 = new Web3(window.ethereum);
const contractAddress = "PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE";

const contract = new web3.eth.Contract(
  Certification.abi,
  contractAddress
);

export { web3, contract };
```

> **Note:** Replace `PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE` with the address shown in Truffle migration output or Ganache GUI.

### 9. Starting the React App

```bash
npm run start
```

The app will run at: http://localhost:3000

Connect MetaMask (Custom RPC) to `http://127.0.0.1:7545` and select one of the Ganache accounts.

---

## 🧪 Testing Smart Contracts (Optional)

1. Write tests in the `test/` directory (e.g., `certification.test.js`).  
2. Run:

```bash
truffle test
```

---

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repo.  
2. Create a feature branch.  
3. Commit your changes.  
4. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

**Developed By Harsh Jajal**

```
```

