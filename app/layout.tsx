import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VersoVivo | Canções personalizadas feitas a partir da sua história',
  description:
    'Transforme sentimentos reais em uma canção personalizada, delicada e inesquecível.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
