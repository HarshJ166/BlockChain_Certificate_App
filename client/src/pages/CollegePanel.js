import React, { useState, useRef } from "react";
import {
  Download,
  Eye,
  Send,
  Award,
  CheckCircle,
  Shield,
  BookOpen,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { toast } from "../hooks/use-toast";

const CollegePanel = ({ contract, account }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const certificateRef = useRef(null);

  const [form, setForm] = useState({
    certificateId: "CERT-" + Math.floor(10000 + Math.random() * 90000),
    uid: "",
    name: "",
    course: "",
    org: "Shah and Anchor Kutchhi Engineering College",
    ipfs: "",
    proficiencies: "",
    issueDate: new Date().toISOString().split("T")[0],
    grade: "Distinction",
    department: "Department of IT",
    signature1: "Dr.Bhavesh Patel",
    signature2: "Dr.DJ",
  });

  const gradeOptions = [
    { value: "Distinction", label: "Distinction" },
    { value: "Merit", label: "Merit" },
    { value: "Pass", label: "Pass" },
    { value: "Honors", label: "Honors" },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would connect to the blockchain
      if (contract && account) {
        await contract.methods
          .generateCertificate(
            form.certificateId,
            form.uid,
            form.name,
            form.course,
            form.org,
            form.ipfs,
            form.proficiencies,
            form.issueDate,
            form.grade
          )
          .send({ from: account });
      } else {
        // Simulate a delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setShowSuccessDialog(true);
      setActiveTab("preview");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 297; // A4 width in landscape
      const imgHeight = 210; // A4 height in landscape

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${form.name.replace(/\s/g, "_")}_Certificate.pdf`);

      toast({
        title: "Success!",
        description: "Certificate downloaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formFields = [
    {
      key: "certificateId",
      label: "Certificate ID",
      type: "text",
      placeholder: "Enter certificate ID",
    },
    {
      key: "uid",
      label: "Student ID",
      type: "text",
      placeholder: "Enter student ID",
    },
    {
      key: "name",
      label: "Student Name",
      type: "text",
      placeholder: "Enter full name",
    },
    {
      key: "course",
      label: "Course Name",
      type: "text",
      placeholder: "Enter course title",
    },
    {
      key: "org",
      label: "Institution",
      type: "text",
      placeholder: "Enter institution name",
    },
    {
      key: "department",
      label: "Department",
      type: "text",
      placeholder: "Enter department name",
    },
    {
      key: "proficiencies",
      label: "Specializations",
      type: "text",
      placeholder: "Enter specializations (comma separated)",
    },
    { key: "issueDate", label: "Issue Date", type: "date" },
    {
      key: "ipfs",
      label: "IPFS Hash",
      type: "text",
      placeholder: "Enter IPFS hash",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-serif">
                Academic Certificate Management
              </CardTitle>
              <CardDescription>
                Generate, preview and issue blockchain-verified certificates
              </CardDescription>
            </div>
            <Shield className="h-10 w-10 text-blue-600" />
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="form" className="text-base">
            <BookOpen className="mr-2 h-4 w-4" />
            Certificate Details
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-base">
            <Eye className="mr-2 h-4 w-4" />
            Preview Certificate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-blue-600" />
                Certificate Information
              </CardTitle>
              <CardDescription>
                Enter the details for the academic certificate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <Input
                      id={field.key}
                      type={field.type || "text"}
                      placeholder={field.placeholder || ""}
                      value={form[field.key]}
                      onChange={(e) =>
                        setForm({ ...form, [field.key]: e.target.value })
                      }
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Classification</Label>
                  <Select
                    value={form.grade}
                    onValueChange={(value) =>
                      setForm({ ...form, grade: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 bg-slate-50">
              <Button variant="outline" onClick={() => setActiveTab("preview")}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                <Send className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Certificate"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Certificate Preview</CardTitle>
                  <CardDescription>
                    Preview how the certificate will appear when issued
                  </CardDescription>
                </div>
                <Button onClick={handleDownload} variant="default">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center p-8">
              <div
                ref={certificateRef}
                className="w-full bg-white shadow-lg rounded-md overflow-hidden"
                style={{
                  maxWidth: "900px",
                  aspectRatio: "1.414/1", // A4 ratio
                  minHeight: "600px", // Ensure minimum height to fit all content
                }}
              >
                <div className="relative border-8 border-blue-50 h-full p-6 flex flex-col justify-between">
                  {/* Background/Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <div className="text-9xl font-serif transform rotate-45">
                      {form.org || "UNIVERSITY"}
                    </div>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-700 opacity-20"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-blue-700 opacity-20"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-blue-700 opacity-20"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-700 opacity-20"></div>

                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center mb-3">
                      <div className="flex justify-center mb-2">
                        <div className="h-16 w-16 rounded-full bg-blue-800 flex items-center justify-center">
                          <Award size={32} className="text-white" />
                        </div>
                      </div>
                      <div className="text-xl font-serif text-blue-900 font-bold">
                        {form.org || "Cambridge University"}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        {form.department}
                      </div>
                      <div className="mx-auto w-48 h-px bg-gray-200 my-2"></div>
                    </div>
                    {/* Certificate Content */}
                    {/* Certificate Content */}
                    <div className="text-center flex-grow">
                      <div className="mb-2">
                        <div className="text-lg uppercase tracking-widest text-gray-600">
                          Certificate of
                        </div>
                        <div className="text-3xl font-serif font-bold text-blue-900 mb-3">
                          Academic Achievement
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 mb-1">
                        This certifies that
                      </div>
                      <div className="text-2xl font-serif font-bold text-blue-900 mb-1">
                        {form.name || "Student Name"}
                      </div>

                      <div className="text-sm text-gray-500 my-2">
                        has successfully completed the course of study in
                      </div>
                      <div className="text-xl font-serif font-semibold text-blue-800 mb-1">
                        {form.course || "Course Name"}
                      </div>

                      {form.proficiencies && (
                        <div className="text-sm mt-2 mb-2">
                          <span className="text-gray-600">
                            with specialization in:{" "}
                          </span>
                          <span className="italic">{form.proficiencies}</span>
                        </div>
                      )}

                      <div className="flex justify-center items-center gap-3 my-3">
                        <Badge
                          variant="outline"
                          className="text-base py-1 border-blue-200 text-blue-800"
                        >
                          {form.grade || "Distinction"}
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-500 mt-2">
                        Issued on{" "}
                        {form.issueDate || new Date().toLocaleDateString()}
                      </div>
                    </div>
                    {/* Footer/Signatures */}
                    <div className="mt-4 pt-2">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="h-px w-full bg-gray-300 mb-1"></div>
                          <div className="text-sm font-medium">
                            {form.signature1 || "Program Director"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Course Director
                          </div>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="border border-dashed border-gray-300 px-2 py-1 rounded text-xs mb-1">
                            Certificate ID: {form.certificateId || "CERT-12345"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Blockchain Verified
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="h-px w-full bg-gray-300 mb-1"></div>
                          <div className="text-sm font-medium">
                            {form.signature2 || "University Registrar"}
                          </div>
                          <div className="text-xs text-gray-500">Registrar</div>
                        </div>
                      </div>

                      {/* Institutional footer */}
                      <div className="text-center mt-2 pt-1 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          {form.org} | {form.department} | Certificate Valid as
                          of {form.issueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Certificate Generated Successfully
            </DialogTitle>
            <DialogDescription>
              The certificate has been generated and recorded on the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Transaction Complete</AlertTitle>
              <AlertDescription>
                Certificate ID: {form.certificateId}
                <br />
                Student: {form.name}
                <br />
                IPFS Hash: {form.ipfs || "Hash will be generated in production"}
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
            >
              Close
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollegePanel;
