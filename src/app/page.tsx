import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { BodyWrapper } from "@/components/wrappers";
import Link from "next/link";
import { FaUpload, FaDownload, FaUsers, FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <BodyWrapper>
      <div className="space-y-6">
        <Title>Welcome to CrewVault</Title>

        <p className="mt-7 text-foreground text-lg">
          Upload, download, and share saved documents, notes, and cheat sheets
          to ace your exams without breaking a sweat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <Link
            href="/crews"
            className="rounded-lg bg-sidebar p-6 shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-foreground text-xl font-semibold mb-2 flex items-center gap-2">
              <FaUpload /> Upload Cheats
            </h2>
            <p className="text-foreground/70">
              Share your secret sauce with others. Upload saved files, handwritten notes, or screenshots.
            </p>
          </Link>

          <Link
            href="/crews"
            className="rounded-lg bg-sidebar p-6 shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-foreground text-xl font-semibold mb-2 flex items-center gap-2">
              <FaDownload /> Download Materials
            </h2>
            <p className="text-foreground/70">
              Browse uploaded content and download directly to your device.
            </p>
          </Link>
        </div>

        <div className="mt-10 bg-sidebar p-6 rounded-xl">
          <h3 className="text-foreground text-lg font-semibold mb-2 flex items-center gap-2">
            <FaUsers /> Join or Create Crews
          </h3>
          <p className="text-foreground/70 mb-4">
            Want to collaborate with classmates? Join a crew or create your own to share materials privately.
          </p>
          <div className="flex gap-4">
            <Link
              href="/crews"
              className="bg-foreground text-sidebar px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
            >
              <FaUsers /> Explore Crews
            </Link>
            <Link
              href="/crews/new"
              className="bg-transparent border border-foreground text-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
            >
              <FaPlus /> Create Crew
            </Link>
          </div>
        </div>

        <div className="mt-10 text-sm text-foreground/50 italic">
          ⚠️ For educational purposes only. We do not condone academic dishonesty.
        </div>
      </div>
    </BodyWrapper>
  );
}
