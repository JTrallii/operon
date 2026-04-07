
import Header from "../../components/header/header";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="p-20">{children}</main>
    </>
  );
};

export default Layout;
