import Sidebar from "../features/sidebar/components/Sidebar";
import ChatArea from "../features/chat/components/ChatArea";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#07111f] text-white">

      <Sidebar />

      <ChatArea />

    </div>
  );
}