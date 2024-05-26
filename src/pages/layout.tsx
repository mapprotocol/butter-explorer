
import Header from '@/components/header';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Image from "next/image";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <MantineProvider>
      <Header></Header>
      <main >{children}</main>
      <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
        <Image
          layout="responsive"
          width={1920}  
          height={1080} 
          style={{ objectFit: "contain" }}
          src={`/images/foot.png`}
          alt="map"
        />
      </div>
    </MantineProvider>

  );
}
