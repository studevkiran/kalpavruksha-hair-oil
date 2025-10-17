export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100/60">
      <div className="container-section py-10 text-sm text-gray-600 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-gray-800">Kalpavruksha Hair Oil</p>
          <p>51 Magical Ingredients | 100% Natural | Hand Made</p>
          <p className="text-gray-500 mt-2">For external use only.</p>
        </div>
        <div>
          <p><span className="font-medium">Phone:</span> 89514 37815</p>
          <p><span className="font-medium">GST No.:</span> —</p>
          <p><span className="font-medium">Address:</span> —</p>
          <p><span className="font-medium">Net Wgt.:</span> —</p>
        </div>
        <div className="sm:text-right">
          <p>© {new Date().getFullYear()} Kalpavruksha. All rights reserved.</p>
          <p className="text-gray-500">Crafted with care. Nature-first.</p>
        </div>
      </div>
    </footer>
  )
}
