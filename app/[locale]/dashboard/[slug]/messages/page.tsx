// app/dashboard/[slug]/page.tsx
import { Construction } from "lucide-react";
import Link from "next/link";



export default function SalesPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-8 p-6 bg-primary/10 rounded-full">
        <Construction className="h-16 w-16 text-primary" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Feature Coming Soon</h1>
      
      <p className="text-muted-foreground max-w-md mb-8">
        We&apos;re working hard to bring you this feature. Our team is developing something amazing 
        that will help you manage your business more effectively.
      </p>
      
      <div className="bg-muted p-6 rounded-lg max-w-md w-full mb-8">
        <h2 className="font-semibold mb-2">What to expect:</h2>
        <ul className="text-sm text-left space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Comprehensive business dashboard with analytics
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Order management system
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Product inventory management
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Store customization options
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href={`/`}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Check Available Features
        </Link>
        
        <button 
          className="px-6 py-3 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          disabled
        >
          Notify Me When Ready
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-8">
        Expected launch: Q1 2024
      </p>
    </div>
  );
}