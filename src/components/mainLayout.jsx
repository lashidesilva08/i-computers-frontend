// src/layouts/MainLayout.jsx
import Header from "./header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-[100px]">
        {children}
      </main>
    </>
  );
}
