const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold mb-3">WoodNest</h2>
          <p className="text-sm text-gray-600">
            Premium furniture for modern homes. Quality, comfort and style in
            every piece.
          </p>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Dining Room</li>
            <li>Home Office</li>
            <li>Mattress</li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Return Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: support@woodnest.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Mon – Sat: 9AM – 7PM</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
          <span>© {new Date().getFullYear()} WoodNest. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
