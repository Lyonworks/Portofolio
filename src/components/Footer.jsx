export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-8 pt-20 pb-10 bg-black">
      <div className="mt-10 mb-14 text-center text-xs text-[#F5F5F5] border-t border-[#0000FF] pt-5">
        © {year} Lyon • All rights reserved.
      </div>
    </footer>
  );
}
