export function Footer() {
  return (
    <footer className="bg-[var(--buddy-navy)] text-white py-8 z-20 relative">
      <div className="buddy-container max-w-container mx-auto px-4">
        <div className="ml-8 max-w-[632px] flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-sm mb-6">
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">
            Privacy Collection Notice
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">
            Policy Booklet
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
        <div className="ml-8 text-xs text-gray-400 text-left">
          <p>
            This policy is issued by PetSure (Australia) Pty Ltd ABN 95 075 949 923, AFSL 420183 and promoted and
            distributed by Greenstone Financial Services Pty Ltd ABN 53 128 692 884, AFSL 343079. Any advice provided is
            general only and does not take into account your individual objectives, financial situation or needs. Please
            consider the Product Disclosure Statement (PDS) and TMD available at buddypetinsurance.com.au to ensure this
            product meets your needs before purchasing, or choosing to continue with the product.
          </p>
        </div>
      </div>
    </footer>
  )
}
