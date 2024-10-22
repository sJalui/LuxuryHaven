const Footer = () => {
  return (
    <div className="bg-blue-800 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-4xl text-white font-serif tracking-wide">
          LuxuryHaven.com
        </span>
        <span className="text-white font-sans flex gap-6">
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
          <a
            href="https://github.com/sJalui"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline"
          >
            Created by Shubh & Eeshanya
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
