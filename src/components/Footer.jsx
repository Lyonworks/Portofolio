export default function Footer() {
  return (
    <footer className="h-24 flex items-center justify-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Lyon • All rights reserved
      </p>
    </footer>
  );
}
