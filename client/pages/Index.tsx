import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  Truck,
  Shield,
  CreditCard,
  MapPin,
  Phone,
  Clock,
  Heart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  cashPrice: number;
  installmentPrice: number;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

interface OrderInfo {
  location: string;
  note: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "جيهاز ضغط",
    cashPrice: 80000,
    installmentPrice: 95000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F1a5f459449c149a78e7953a58bca2892",
  },
  {
    id: 2,
    name: "مساج",
    cashPrice: 80000,
    installmentPrice: 95000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F1cd77126049844e7a15fbb1ffe43f30c?format=webp&width=800",
  },
  {
    id: 3,
    name: "شسوار ئينزو",
    cashPrice: 95000,
    installmentPrice: 110000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Ff77775fefd7a4239aec89280c17de6d6?format=webp&width=800",
  },
  {
    id: 4,
    name: "شسوار دايسن",
    cashPrice: 80000,
    installmentPrice: 95000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fdacc2acaecbd4b4a82f6746a7888bbe2?format=webp&width=800",
  },
  {
    id: 5,
    name: "ئوتى سوكانی (مكوى سوكان)",
    cashPrice: 95000,
    installmentPrice: 110000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F4c74be9f669749f68ebed760d6219ce8?format=webp&width=800",
  },
  {
    id: 6,
    name: "جهاز قهوا",
    cashPrice: 80000,
    installmentPrice: 95000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fbcb2bcc07d3a4b459561280d73bfb9f9?format=webp&width=800",
  },
  {
    id: 7,
    name: "جهازی هەوایێ سیارێ",
    cashPrice: 90000,
    installmentPrice: 105000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fd78724a5863348ce955a12a575ebd103?format=webp&width=800",
  },
  {
    id: 8,
    name: "جهاز قلاویە/گۆسۆنیک",
    cashPrice: 145000,
    installmentPrice: 165000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Ff4b8c7f4bb4546c2b9e2efdcbab30c8?format=webp&width=800",
  },
  {
    id: 9,
    name: "جهاز قلایە",
    cashPrice: 130000,
    installmentPrice: 145000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fd382c4c0200a498c865feefe35a4aaa3?format=webp&width=800",
  },
  {
    id: 10,
    name: "عسارة سوبر كرێست",
    cashPrice: 80000,
    installmentPrice: 95000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F68edd75f52714ee9a02314eba2579aec?format=webp&width=800",
  },
  {
    id: 11,
    name: "عسارة ستلبێت",
    cashPrice: 190000,
    installmentPrice: 215000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fce354e26ed7743a9b790413c9515aba6?format=webp&width=800",
  },
  {
    id: 12,
    name: "گێسک",
    cashPrice: 220000,
    installmentPrice: 240000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F175762f2b75445bab472dc0b323e3f68?format=webp&width=800",
  },
  {
    id: 13,
    name: "مەکینا گوشتی",
    cashPrice: 220000,
    installmentPrice: 240000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fdef273286940452abf8feda6b458b9e8?format=webp&width=800",
  },
  {
    id: 14,
    name: "سوپە",
    cashPrice: 110000,
    installmentPrice: 125000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fc33df007c92e4038ac74e8d787273022?format=webp&width=800",
  },
  {
    id: 15,
    name: "قازان (گرانێت)",
    cashPrice: 140000,
    installmentPrice: 160000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fc3536a1b02554e74bcd2134965b8876d?format=webp&width=800",
  },
  {
    id: 16,
    name: "قازان (گرانێت) (5) عدد",
    cashPrice: 170000,
    installmentPrice: 195000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F6f6127442f024fed8acd6b247d03d20c?format=webp&width=800",
  },
  {
    id: 17,
    name: "قازان بخار",
    cashPrice: 130000,
    installmentPrice: 150000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fc3536a1b02554e74bcd2134965b8876d?format=webp&width=800",
  },
  {
    id: 18,
    name: "طباخ ليزر",
    cashPrice: 110000,
    installmentPrice: 125000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fe00fca457c334bf297f02676842b38e0?format=webp&width=800",
  },
];

const sponsors = [
  {
    id: 1,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F49d88232399b408b88daaefbc6454a79?format=webp&width=800",
    alt: "بەزنار",
  },
  {
    id: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fc7220a032c22418cad81dd727e1a36ce?format=webp&width=800",
    alt: "نیووال",
  },
  {
    id: 3,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F8a1228db19e14d4d84573f6adbddc984?format=webp&width=800",
    alt: "ئێنزۆ",
  },
  {
    id: 4,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F914996a4035548e39f2ad242aa73feb0?format=webp&width=800",
    alt: "گۆسۆنیک",
  },
  {
    id: 5,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F27ec628f01364e42a2de0b9777ba010f?format=webp&width=800",
    alt: "سیلڤەرکرێست",
  },
  {
    id: 6,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2Fd979c7394d614da9bd19d27f62a1cc6f?format=webp&width=800",
    alt: "دایسن",
  },
  {
    id: 7,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F6a8f963712bd44ab9e8221163e301cf6?format=webp&width=800",
    alt: "سۆکانی",
  },
  {
    id: 8,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F6f67ad9a3f7b491ab8729d0481317dcb%2F17792b668f824ab58880f9af8dccfe31?format=webp&width=800",
    alt: "رۆف",
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cash" | "installment"
  >("cash");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orderLocation, setOrderLocation] = useState("");
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ku";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return total;
      const price =
        selectedPaymentMethod === "cash"
          ? product.cashPrice
          : product.installmentPrice;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("سەبەتە بەتاڵە! تکایە پێش داواکاری بەرهەم زیاد بکە");
      return;
    }

    if (!orderLocation.trim()) {
      alert("تکایە ناونیشانی گ��هاندن بنووسە");
      return;
    }

    let message = "سڵاڤ ! داخازیەکم هەیە لە کۆمپانیا بەزنار:\n\n";
    let total = 0;

    cart.forEach((item, idx) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;
      const price =
        selectedPaymentMethod === "cash"
          ? product.cashPrice
          : product.installmentPrice;
      const itemTotal = price * item.quantity;
      total += itemTotal;

      message += `${idx + 1}. ${item.name} - ${item.quantity} دانە - ${formatPrice(itemTotal)} دینار\n`;
    });

    message += `\nکۆی گشتی: ${formatPrice(total)} دینار\n`;
    message += `شێوازی پارەدان: ${selectedPaymentMethod === "cash" ? "نقد" : "قست"}\n\n`;
    message += `📍 ناونیشانی گەهاندن: ${orderLocation}\n`;

    if (orderNote.trim()) {
      message += `📝 تێبینی: ${orderNote}\n`;
    }

    message += "\n🏪 کۆمپانیا بەزنار\n";
    message += "📍 ناڤ و نیشان: دهۆک ماسیکێ نزیک دێرا ئەرمەنا\n";
    message += "📞 ژمارا تەلەفۆنێ: 07517785871";

    const phoneNumber = "9647517785871";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setCart([]);
    setOrderLocation("");
    setOrderNote("");
    setIsCartOpen(false);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-900/90 border-white/10 text-white"
            : "bg-white/90 border-gray-200 text-gray-900"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className={`text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent whitespace-nowrap ${
              isDarkMode
                ? "bg-gradient-to-r from-orange-400 to-purple-400"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            }`}
          >
            کۆمپانیا بەزنار
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a
              href="#"
              className={`font-medium text-lg transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
            >
              سەرەکی
            </a>
            <a
              href="#products"
              className={`font-medium text-lg transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
            >
              بەرهەمەکان
            </a>
            <a
              href="#sponsors"
              className={`font-medium text-lg transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
            >
              کومپانی
            </a>
            <a
              href="#contact"
              className={`font-medium text-lg transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
            >
              پەیوەندی
            </a>
          </nav>

          {/* Header Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="rounded-full relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className={`md:hidden backdrop-blur-md border-t transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-800/95 border-white/10"
                : "bg-white/95 border-gray-200"
            }`}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 text-center">
              <a
                href="#"
                className={`font-medium text-xl py-2 transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                سەرەکی
              </a>
              <a
                href="#products"
                className={`font-medium text-xl py-2 transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                بەرهەمەکان
              </a>
              <a
                href="#sponsors"
                className={`font-medium text-xl py-2 transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                کومپانی
              </a>
              <a
                href="#contact"
                className={`font-medium text-xl py-2 transition-colors ${isDarkMode ? "hover:text-orange-400" : "hover:text-blue-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                پەیوەندی
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        className={`py-24 text-center relative overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10"
              : "bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10"
          }`}
        ></div>
        <div
          className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl animate-pulse ${
            isDarkMode ? "bg-orange-500/20" : "bg-blue-400/30"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDarkMode ? "bg-purple-500/20" : "bg-purple-400/30"
          }`}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="animate-fade-in-up">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent drop-shadow-2xl leading-tight ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 via-white to-purple-400"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`}
            >
              کۆمپانیا بەزنار
            </h1>
            <div
              className={`w-20 sm:w-24 h-1 mx-auto mb-8 rounded-full ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 to-purple-400"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            ></div>
          </div>
          <div className="animate-fade-in-up delay-300">
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed font-medium px-4 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              فرۆشتنی پێداویستییەکانی ناو ماڵ بە کوالێتی بەرز - بە شێوازێ نقد
              یان قست
            </p>
            <p
              className={`text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto px-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              🏠 لە دهۆکەوە بۆ هەموو کوردستان 🚚 گەهاندنی خێرا 💎 کوالێتی بەرز
            </p>
          </div>
          <div className="animate-fade-in-up delay-500">
            <Button
              size="lg"
              className={`px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 border-2 ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-purple-600 hover:via-red-500 hover:to-orange-500 text-white border-white/20"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white border-white/30"
              }`}
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <ShoppingCart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              بینینی بەرهەمەکان
              <span className="mr-1 sm:mr-2">🛍️</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 via-white to-purple-400"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`}
            >
              بەرهەمەکانی ئێمە
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-brand-gold rounded-full"></div>
              <span className="text-2xl">🛍️</span>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-brand-accent rounded-full"></div>
            </div>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              کۆمەڵێک لە باشترین بەرهەمەکانی ماڵەوە بە ��رخ�� گونجاو
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const saveAmount = product.installmentPrice - product.cashPrice;
              const savePercent = Math.round(
                (saveAmount / product.installmentPrice) * 100,
              );

              return (
                <div
                  key={product.id}
                  className={`group backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 hover:rotate-1 transition-all duration-500 shadow-lg hover:shadow-2xl ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-gray-600/30 hover:border-orange-400/50 hover:shadow-orange-500/20"
                      : "bg-gradient-to-br from-white/90 to-blue-50/80 border border-blue-200/50 hover:border-blue-400/50 hover:shadow-blue-500/20"
                  }`}
                >
                  <div className="h-52 bg-gradient-to-br from-brand-secondary/60 to-brand-primary/40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain transform group-hover:scale-110 transition-transform duration-500 relative z-10"
                    />
                    <div className="absolute top-3 right-3 bg-brand-accent/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-brand-accent/30">
                      ج��ید
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 relative">
                    <h3
                      className={`font-bold text-lg sm:text-xl mb-4 min-h-[2.5rem] sm:min-h-[3rem] flex items-center bg-gradient-to-r bg-clip-text text-transparent group-hover:from-brand-gold group-hover:to-brand-accent transition-all duration-300 leading-tight ${
                        isDarkMode
                          ? "from-white to-brand-gold/80"
                          : "from-gray-800 to-blue-600"
                      }`}
                    >
                      {product.name}
                    </h3>

                    <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                      <div className="bg-gradient-to-r from-green-500/20 to-green-400/10 rounded-xl p-2 sm:p-3 border border-green-400/30">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium text-green-300">
                            💰 نرخێ نقدی
                          </span>
                          <span className="font-bold text-base sm:text-lg text-green-400">
                            {formatPrice(product.cashPrice)}{" "}
                            <span className="text-xs sm:text-sm">دینار</span>
                          </span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/10 rounded-xl p-2 sm:p-3 border border-blue-400/30">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium text-blue-300">
                            💳 نرخێ قست
                          </span>
                          <span className="font-bold text-base sm:text-lg text-blue-400">
                            {formatPrice(product.installmentPrice)}{" "}
                            <span className="text-xs sm:text-sm">دینار</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-center text-xs sm:text-sm bg-gradient-to-r from-brand-accent/20 to-orange-500/20 rounded-lg p-2 border border-brand-accent/30">
                        <span className="text-brand-accent font-semibold">
                          🎉 {savePercent}% پاشەکەوت بکە بە پارەدانی نقدی
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 sm:mb-6">
                      <div
                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          isDarkMode
                            ? "bg-gradient-to-r from-green-500/30 to-green-400/20 text-green-300 border-green-400/40"
                            : "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${
                            isDarkMode ? "bg-green-400" : "bg-green-600"
                          }`}
                        ></span>
                        نقد
                      </div>
                      <div
                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          isDarkMode
                            ? "bg-gradient-to-r from-blue-500/30 to-blue-400/20 text-blue-300 border-blue-400/40"
                            : "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${
                            isDarkMode ? "bg-blue-400" : "bg-blue-600"
                          }`}
                        ></span>
                        قیست
                      </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-gradient-to-r from-brand-accent to-orange-600 hover:from-orange-600 hover:to-red-500 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-brand-accent/30 text-sm sm:text-base"
                      >
                        <Plus className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">
                          زیادکردن بۆ سەبەتە
                        </span>
                        <span className="sm:hidden">زیادکردن</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleWishlist(product.id)}
                        className={`border-2 rounded-xl w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${
                          wishlist.includes(product.id)
                            ? "bg-gradient-to-r from-pink-500 to-red-500 border-pink-400 text-white shadow-lg shadow-pink-500/30"
                            : "border-white/30 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:border-pink-400 hover:text-white hover:shadow-lg hover:shadow-pink-500/30"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${wishlist.includes(product.id) ? "fill-current scale-110" : "hover:scale-110"}`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/5 to-brand-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 via-white to-purple-400"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`}
            >
              شێوازێ پارەدانێ
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-brand-gold rounded-full"></div>
              <span className="text-2xl">💳</span>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-brand-accent rounded-full"></div>
            </div>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              هەردوو شێوازی پارەدان بەردەستە - هەڵبژێرە لەگەڵ ئارەزووەکانت
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="group text-center p-10 bg-gradient-to-br from-green-500/20 to-green-400/10 backdrop-blur-md rounded-3xl border-2 border-green-400/30 hover:border-green-400/60 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-2xl hover:shadow-green-500/20">
              <div className="bg-gradient-to-br from-green-500/30 to-green-400/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-green-300 group-hover:text-green-200 transition-colors">
                پارێ کاش
              </h3>
              <p className="mb-8 text-lg opacity-90">
                بەهایەکی تایبەت بۆ پارەدانی نقدی
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-end bg-green-500/20 rounded-xl p-3 border border-green-400/30">
                  <span className="font-medium">نرخێکی کەمتر</span>
                  <span className="text-green-400 mr-3 text-xl">✨</span>
                </div>
                <div className="flex items-center justify-end bg-green-500/20 rounded-xl p-3 border border-green-400/30">
                  <span className="font-medium">ئاسانی پارەدان</span>
                  <span className="text-green-400 mr-3 text-xl">⚡</span>
                </div>
                <div className="flex items-center justify-end bg-green-500/20 rounded-xl p-3 border border-green-400/30">
                  <span className="font-medium">وەرگرتنا ئێکسەر</span>
                  <span className="text-green-400 mr-3 text-xl">🚀</span>
                </div>
              </div>
            </div>

            <div className="group text-center p-10 bg-gradient-to-br from-blue-500/20 to-blue-400/10 backdrop-blur-md rounded-3xl border-2 border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="bg-gradient-to-br from-blue-500/30 to-blue-400/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-blue-300 group-hover:text-blue-200 transition-colors">
                قست
              </h3>
              <p className="mb-8 text-lg opacity-90">
                پارەدان بە شێوازی ئاسان لە ماو��ی چەند مانگ
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-end bg-blue-500/20 rounded-xl p-3 border border-blue-400/30">
                  <span className="font-medium">پارەدا�� بەشێوازی ئاسان</span>
                  <span className="text-blue-400 mr-3 text-xl">📅</span>
                </div>
                <div className="flex items-center justify-end bg-blue-500/20 rounded-xl p-3 border border-blue-400/30">
                  <span className="font-medium">ماوەی درێژخایەن</span>
                  <span className="text-blue-400 mr-3 text-xl">⏰</span>
                </div>
                <div className="flex items-center justify-end bg-blue-500/20 rounded-xl p-3 border border-blue-400/30">
                  <span className="font-medium">بێ بەرێژگاری</span>
                  <span className="text-blue-400 mr-3 text-xl">🎁</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 via-white to-purple-400"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`}
            >
              کومپانی
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div
                className={`w-16 h-1 rounded-full ${
                  isDarkMode
                    ? "bg-gradient-to-r from-transparent to-orange-400"
                    : "bg-gradient-to-r from-transparent to-blue-500"
                }`}
              ></div>
              <span className="text-2xl">🏢</span>
              <div
                className={`w-16 h-1 rounded-full ${
                  isDarkMode
                    ? "bg-gradient-to-l from-transparent to-purple-400"
                    : "bg-gradient-to-l from-transparent to-purple-500"
                }`}
              ></div>
            </div>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              هاوبەشەکانی ئێمە لە جیهاندا
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex-shrink-0 text-center w-40"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
                    <img
                      src={sponsor.image}
                      alt={sponsor.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-lg">
              پەرەپێدەر:{" "}
              <a
                href="https://beacons.ai/berznar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:text-brand-gold transition-colors font-semibold"
              >
                ئەحمەد حسێن
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`text-center p-8 backdrop-blur-md rounded-xl hover:transform hover:scale-105 transition-all ${
                isDarkMode
                  ? "bg-white/10 border border-white/20"
                  : "bg-blue-50/80 border border-blue-200/50"
              }`}
            >
              <Truck
                className={`h-16 w-16 mx-auto mb-6 ${
                  isDarkMode ? "text-orange-400" : "text-blue-600"
                }`}
              />
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                گەهاندن
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                گەهاندنا خێرا بۆ هەمی شارەکانی کوردستان لە ماوێ ٢٤-٤٨ کاتژمێر ،
                بۆ ناڤ دهۆکێ بێ بەرامبەرە
              </p>
            </div>

            <div
              className={`text-center p-8 backdrop-blur-md rounded-xl hover:transform hover:scale-105 transition-all ${
                isDarkMode
                  ? "bg-white/10 border border-white/20"
                  : "bg-purple-50/80 border border-purple-200/50"
              }`}
            >
              <Shield
                className={`h-16 w-16 mx-auto mb-6 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                زەمان
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                هەموو بەرهەمەکان زەمانی دوو ساڵیان هەیە
              </p>
            </div>

            <div
              className={`text-center p-8 backdrop-blur-md rounded-xl hover:transform hover:scale-105 transition-all ${
                isDarkMode
                  ? "bg-white/10 border border-white/20"
                  : "bg-pink-50/80 border border-pink-200/50"
              }`}
            >
              <CreditCard
                className={`h-16 w-16 mx-auto mb-6 ${
                  isDarkMode ? "text-pink-400" : "text-pink-600"
                }`}
              />
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                پارەدان
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                پارەدان بە شێ��ازی نقدی یان قست بە پلانی ئاسان
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className={`backdrop-blur-md border-t py-16 ${
          isDarkMode
            ? "bg-gray-900/90 border-white/10"
            : "bg-gray-50/90 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div
              className={`text-3xl font-bold bg-clip-text text-transparent mb-4 ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 to-purple-400"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}
            >
              بەزنار
            </div>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              فرۆشتنا پێدڤیێت ناڤ ماڵێ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            <div
              className={`flex items-center justify-center md:justify-end gap-4 p-6 rounded-xl ${
                isDarkMode
                  ? "bg-white/5"
                  : "bg-blue-50/80 border border-blue-200/50"
              }`}
            >
              <div className="text-right">
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  ناڤ و نیشان
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  دهۆک ماسیکێ نزیک دێرا ئەرمەنا
                </p>
              </div>
              <MapPin
                className={`h-8 w-8 flex-shrink-0 ${
                  isDarkMode ? "text-orange-400" : "text-blue-600"
                }`}
              />
            </div>

            <div
              className={`flex items-center justify-center md:justify-end gap-4 p-6 rounded-xl ${
                isDarkMode
                  ? "bg-white/5"
                  : "bg-green-50/80 border border-green-200/50"
              }`}
            >
              <div className="text-right">
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  ژمارا مۆبایلێ
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  07517785871
                </p>
              </div>
              <Phone
                className={`h-8 w-8 flex-shrink-0 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              />
            </div>

            <div
              className={`flex items-center justify-center md:justify-end gap-4 p-6 rounded-xl ${
                isDarkMode
                  ? "bg-white/5"
                  : "bg-purple-50/80 border border-purple-200/50"
              }`}
            >
              <div className="text-right">
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  کاتەکانی کار
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  شەمە - هەینی: ١٠:٠٠ AM - ٨:٠٠ PM
                </p>
              </div>
              <Clock
                className={`h-8 w-8 flex-shrink-0 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 mb-8">
            <a
              href="https://www.snapchat.com/add/companya.baznar"
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                isDarkMode
                  ? "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-2 border-yellow-400/30 hover:bg-yellow-500 hover:border-yellow-400"
                  : "bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 hover:bg-yellow-400 hover:border-yellow-500"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.966-.896 6.728-.896 6.728-.347 1.375-.896 1.612-1.188 1.612-.292 0-.841-.237-1.188-1.612 0 0-.727-4.762-.896-6.728-.056-.621.15-1.3.967-1.3.817 0 1.023.679.967 1.3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/companya.baznar"
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                isDarkMode
                  ? "bg-gradient-to-br from-pink-400/20 to-purple-600/20 border-2 border-pink-400/30 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:border-pink-400"
                  : "bg-gradient-to-br from-pink-100 to-purple-200 border-2 border-pink-300 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:border-pink-500"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://wa.me/9647517785871"
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                isDarkMode
                  ? "bg-gradient-to-br from-green-400/20 to-green-600/20 border-2 border-green-400/30 hover:bg-green-500 hover:border-green-400"
                  : "bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 hover:bg-green-400 hover:border-green-500"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097" />
              </svg>
            </a>
          </div>

          <div
            className={`text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <p>© ٢٠٢٥ کۆمپانیا بەزنار. هەمی ماف دپاراستینە.</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md backdrop-blur-md z-50 p-4 sm:p-6 overflow-y-auto ${
              isDarkMode ? "bg-gray-900/95" : "bg-white/95"
            }`}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/20">
              <h3 className="text-xl font-bold">سەبەتەی فرۆشتن</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center py-8 opacity-80">سەبەتە بەتاڵە!</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    if (!product) return null;
                    const price =
                      selectedPaymentMethod === "cash"
                        ? product.cashPrice
                        : product.installmentPrice;

                    return (
                      <div
                        key={item.id}
                        className={`flex gap-4 p-4 rounded-xl ${
                          isDarkMode ? "bg-white/10" : "bg-gray-100"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{item.name}</h4>
                          <p className="text-brand-gold font-bold">
                            {formatPrice(price)} دینار
                          </p>
                          <p className="text-sm opacity-80">
                            شێوازێ پارەدان:{" "}
                            {selectedPaymentMethod === "cash" ? "نقد" : "قست"}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-right text-xl font-bold mb-6">
                  کۆی گشتی: {formatPrice(getCartTotal())} دینار
                </div>

                <div className="flex gap-4 mb-6">
                  <Button
                    variant={
                      selectedPaymentMethod === "cash" ? "default" : "outline"
                    }
                    onClick={() => setSelectedPaymentMethod("cash")}
                    className="flex-1 flex flex-col items-center gap-2 h-auto py-4"
                  >
                    <CreditCard className="h-6 w-6" />
                    نقد
                  </Button>
                  <Button
                    variant={
                      selectedPaymentMethod === "installment"
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setSelectedPaymentMethod("installment")}
                    className="flex-1 flex flex-col items-center gap-2 h-auto py-4"
                  >
                    <CreditCard className="h-6 w-6" />
                    قست
                  </Button>
                </div>

                {/* Location Input */}
                <div className="mb-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    📍 ناونیشانی گەهاندن *
                  </label>
                  <input
                    type="text"
                    value={orderLocation}
                    onChange={(e) => setOrderLocation(e.target.value)}
                    placeholder="بۆ نموونە: دهۆک، ژمارە ١٠، سەر شەقامی سەرەکی"
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none`}
                    required
                  />
                </div>

                {/* Note Input */}
                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    📝 تێبینی (اختیاری)
                  </label>
                  <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="هەر تێبینییەکت هەیە لەسەر داخازەکە..."
                    rows={3}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none`}
                  />
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={!orderLocation.trim()}
                  className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                    !orderLocation.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 hover:scale-105"
                  } text-white`}
                >
                  <span className="mr-2">💬</span>
                  داخاز بکە ب WhatsApp
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
