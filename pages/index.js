
import dynamic from "next/dynamic";
const CareerPathApp = dynamic(() => import("../src/CareerPathApp"), { ssr: false });
export default function Home() {
  return <CareerPathApp />;
}
