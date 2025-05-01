import React, { useState } from "react";
import {
  Search,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  FileSearch,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";

// Import shadcn/ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "../hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const VerifyPanel = ({ contract }) => {
  const [certId, setCertId] = useState("");
  const [verified, setVerified] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);

  const validateInput = () => {
    if (!certId.trim()) {
      setError("Please enter a valid certificate ID");
      toast({
        title: "Missing Information",
        description: "Please enter a certificate ID to verify",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleVerify = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      setError(null);
      setVerified(null);
      setCertificateData(null);
      setTransactionHash(null);

      // In a real implementation, this would connect to the blockchain
      if (contract) {
        // Verify certificate authenticity
        const result = await contract.methods.isVerified(certId).call();
        setVerified(result);

        // If verified, try to fetch certificate details
        if (result) {
          try {
            // Fetch data from blockchain (in real implementation)
            const data = await contract.methods
              .getCertificateData(certId)
              .call();
            setCertificateData({
              name: data.name || "Student Name",
              course: data.course || "Course Name",
              issueDate: data.issueDate || "Issue Date",
              organization: data.org || "University Name",
              proficiencies: data.proficiencies || "-",
              grade: data.grade || "Merit",
              department: data.department || "Department of Computer Science",
            });

            // Set a mock transaction hash for demo purposes
            setTransactionHash(
              "0x7a69d66c39efd21ffb871ea8ef22d637148f499dfdfce301af4267f814d15e52"
            );
          } catch (fetchError) {
            console.error("Could not fetch certificate details:", fetchError);
            toast({
              title: "Certificate Found",
              description:
                "Certificate is valid, but details could not be retrieved",
              variant: "default",
            });
          }
        } else {
          toast({
            title: "Invalid Certificate",
            description: "This certificate could not be verified",
            variant: "destructive",
          });
        }
      } else {
        // Demo mode - simulate a blockchain response after a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo: if certificate ID starts with "CERT-", consider it valid
        const isValid = certId.startsWith("CERT-");
        setVerified(isValid);

        if (isValid) {
          setCertificateData({
            name: "John A. Smith",
            course: "Master of Computer Science",
            issueDate: "2025-04-15",
            organization: "Cambridge University",
            department: "Department of Computer Science",
            proficiencies: "AI, Machine Learning, Blockchain",
            grade: "Distinction",
          });
          setTransactionHash(
            "0x7a69d66c39efd21ffb871ea8ef22d637148f499dfdfce301af4267f814d15e52"
          );

          toast({
            title: "Verification Successful",
            description: "Certificate has been verified as authentic",
            variant: "default",
          });
        } else {
          toast({
            title: "Verification Failed",
            description: "This certificate could not be verified",
            variant: "destructive",
          });
        }
      }
    } catch (verifyError) {
      console.error("Verification error:", verifyError);
      setError("Failed to verify certificate. Please try again.");
      toast({
        title: "Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-md border-gray-200">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-serif flex items-center">
                <Shield className="mr-2 h-6 w-6 text-blue-600" />
                Certificate Verification Portal
              </CardTitle>
              <CardDescription>
                Verify the authenticity of blockchain-secured academic
                certificates
              </CardDescription>
            </div>
            <FileSearch className="h-10 w-10 text-blue-600" />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="space-y-2">
              <Label htmlFor="certificate-id" className="text-base">
                Enter Certificate ID
              </Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    id="certificate-id"
                    type="text"
                    className="pl-10"
                    placeholder="e.g. CERT-12345"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <Button
                  onClick={handleVerify}
                  disabled={loading}
                  className="min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" /> Verify
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Verification Result */}
            {verified !== null && !error && (
              <Alert
                variant={verified ? "default" : "destructive"}
                className={
                  verified ? "bg-green-50 border-green-200 text-green-800" : ""
                }
              >
                {verified ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {verified ? "Certificate is Valid" : "Invalid Certificate"}
                </AlertTitle>
                <AlertDescription>
                  {verified
                    ? "This certificate has been verified as authentic and was issued by the claimed institution."
                    : "This certificate ID could not be verified in our system. Please check the ID and try again."}
                </AlertDescription>
              </Alert>
            )}

            {/* Certificate Details (shown only if verified) */}
            {verified && certificateData && (
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Certificate Details</CardTitle>
                </CardHeader>
                <CardContent className="pb-0">
                  <Table>
                    <TableBody>
                      {Object.entries(certificateData).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="py-2 font-medium text-gray-500 capitalize w-1/3">
                            {key === "issueDate" ? "Issue Date" : key}
                          </TableCell>
                          <TableCell className="py-2">
                            {key === "grade" ? (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-800 border-blue-200"
                              >
                                {value}
                              </Badge>
                            ) : (
                              value
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Blockchain Transaction Details */}
            {verified && transactionHash && (
              <div className="text-sm text-gray-500 flex items-center">
                <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
                <span>Transaction:</span>
                <code className="mx-2 px-2 py-0.5 bg-gray-100 rounded text-gray-800 font-mono text-xs">
                  {`${transactionHash.substring(
                    0,
                    10
                  )}...${transactionHash.substring(
                    transactionHash.length - 8
                  )}`}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs px-2"
                  onClick={() => {
                    navigator.clipboard.writeText(transactionHash);
                    toast({
                      title: "Copied",
                      description: "Transaction hash copied to clipboard",
                      variant: "default",
                    });
                  }}
                >
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs px-2"
                  onClick={() =>
                    window.open(
                      `https://etherscan.io/tx/${transactionHash}`,
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> View
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t p-4 bg-slate-50 text-sm text-gray-500">
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-blue-600" />
            Blockchain-verified certificates ensure authenticity and prevent
            forgery
          </div>
          <Badge variant="outline" className="text-xs">
            Secure
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyPanel;
