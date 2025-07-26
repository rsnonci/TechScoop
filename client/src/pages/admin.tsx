import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";

export default function Admin() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
}
